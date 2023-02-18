import { createUser } from "~~/server/db/users";
import { userTransformer } from "~~/server/transformers/user";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { username, email, password, repeatPassword, fname, lname } = body;

  if (!username || !email || !password || !repeatPassword || !fname || !lname) {
    return sendError(
      event,
      createError({ statusCode: 400, statusMessage: "Invalid params" })
    );
  }

  if (password !== repeatPassword) {
    createError({ statusCode: 400, statusMessage: "Password doesn't match." });
  }

  const userData = {
    username,
    email,
    password,
    fname,
    lname,
    profileImage: "https://picsum.photos/200/200",
  };

  // Pass data to database model to save
  const user = await createUser(userData);

  return {
    body: userTransformer(user),
  };
});
