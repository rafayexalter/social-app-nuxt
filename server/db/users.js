import { prisma } from ".";
import bcrypt from "bcrypt";

export async function createUser(userData) {
  // Get data and replace password with hashed one.
  const finalUserData = {
    ...userData,
    password: bcrypt.hashSync(userData.password, 10),
  };

  return await prisma.user.create({
    data: finalUserData,
  });
}

export const getUserByUsername = (username) => {
  // Find username if it's exist and return it.
  return prisma.user.findUnique({
    where: {
      username,
    },
  });
};

export const getUserById = (userId) => {
  // Find username if it's exist and return it.
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
};
