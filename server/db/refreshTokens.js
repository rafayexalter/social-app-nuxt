import { prisma } from ".";

// Save token that is passed to this function to schema of refreshToken which is connected to userId
export const createRefreshToken = (refreshToken) => {
  /* 
  refreshToken:
  {
    token: refreshToken,
    userId: user.id,
  } 
  */
  return prisma.refreshToken.create({
    data: refreshToken,
  });
};

export const getRefreshTokenByToken = (token) => {
  return prisma.refreshToken.findUnique({
    where: {
      token,
    },
  });
};
