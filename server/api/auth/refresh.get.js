import { getRefreshTokenByToken } from "~~/server/db/refreshTokens";
import { getUserById } from "~~/server/db/users";
import { decodeRefreshToken } from "~~/server/utils/jwt";

export default defineEventHandler(async (event) => {
  // get the cookies saved by jwt while logging in, with the name of refresh_token
  const refresh_token = getCookie(event, "refresh_token");

  // see if refresh token is not present
  if (!refresh_token) {
    return sendError(
      event,
      createError({
        statusMessage: "Refresh token is invalid",
        statusCode: 401,
      })
    );
  }

  // Check if the refresh token is present in database
  const rToken = await getRefreshTokenByToken(refresh_token);

  if (!rToken) {
    return sendError(
      event,
      createError({
        statusMessage: "Refresh token is invalid",
        statusCode: 401,
      })
    );
  }

  // Decode token with secret refresh token
  // returns userId, iat, exp
  const token = decodeRefreshToken(refresh_token);

  try {
    const user = await getUserById(token.userId);

    const { accessToken } = generateTokens(user);

    return {
      user,
      access_token: accessToken,
    };
  } catch (error) {
    return sendError(
      event,
      createError({
        statusMessage: "Something is wrong",
        statusCode: 500,
      })
    );
  }

  // return {
  //   refresh_token: token,
  // };
});
