// This function created to skip password from the 'user' data and return no password
export const userTransformer = (user) => {
  return {
    id: user.id,
    fname: user.fname,
    lname: user.lname,
    email: user.email,
    username: user.username,
    profileImage: user.profileImage,
    handle: "@" + user.username,
  };
};
