import { getUserByUsername } from "~~/server/db/users";
import bcrypt from "bcrypt";
import { generateTokens, sendRefreshToken } from "~~/server/utils/jwt";
import { userTransformer } from "~~/server/transformers/user";
import { createRefreshToken } from "~~/server/db/refreshTokens";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { username, password } = body;

  if (!username || !password) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: "Invalid params",
      })
    );
  }

  // If user registered
  const user = await getUserByUsername(username);

  if (!user) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: "Invalid username/password",
      })
    );
  }

  // Compare passwords
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: "Invalid username/password",
      })
    );
  }

  // Generate Tokens // Access Token // Refresh Token

  // Send user data to "generateTokens" and receive tokens
  // Refresh Token will be saved in a cookie, so only the server can access it.
  const { accessToken, refreshToken } = generateTokens(user);

  // Send user id and refresh token to (createRefreshToken) refreshTokens.js and save it inside db
  await createRefreshToken({
    token: refreshToken,
    userId: user.id,
  });

  // Send refresh token to method and add http only cookie from server
  sendRefreshToken(event, refreshToken);

  // Send data to client excluding password
  return {
    access_token: accessToken,
    user: userTransformer(user),
  };
});
