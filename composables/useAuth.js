import jwt_decode from "jwt-decode";

export default () => {
  const useAuthToken = () => useState("auth_token");
  const useAuthUser = () => useState("auth_user");
  const useAuthLoading = () => useState("auth_loading", () => true);

  const setToken = (newToken) => {
    /**
     * Get token and update its state
     */
    const authToken = useAuthToken();
    authToken.value = newToken;
  };

  const setUser = (newUser) => {
    /**
     * Get user and update its state
     */
    const authUser = useAuthUser();
    authUser.value = newUser;
  };

  const setIsLoading = (value) => {
    const authLoading = useAuthLoading();
    authLoading.value = value;
  };

  const login = ({ username, password }) => {
    console.log(username, password);
    return new Promise(async (resolve, reject) => {
      try {
        const data = await $fetch("/api/auth/login", {
          method: "POST",
          body: {
            username,
            password,
          },
        });

        // Get data from api and set it to state using helper functions
        // Access Token
        setToken(data.access_token);
        setUser(data.user);

        console.log("Data from login method: ", data);
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };

  const refreshToken = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await $fetch("/api/auth/refresh");

        //console.log("setToken", data.access_token);
        // save token data in useAuthToken using setToken in case of refresh page
        setToken(data.access_token);

        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };

  const getUser = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await useFetchApi("/api/auth/user");

        // save user data in useAuthUser using setUser
        setUser(data.user);
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };

  const reRefreshAccessToken = () => {
    const authToken = useAuthToken();

    if (!authToken.value) {
      return;
    }

    console.log("Encode: authToken", authToken.value);
    const jwt = jwt_decode(authToken.value);
    console.log("Decode: authToken", jwt);

    const newRefreshTime = jwt.exp - 600000;

    // using async so refreshToken(); reRefreshAccessToken(); both functions don't overlap
    setTimeout(async () => {
      await refreshToken();
      reRefreshAccessToken();
    }, newRefreshTime);
  };

  const initAuth = () => {
    return new Promise(async (resolve, reject) => {
      setIsLoading(true);
      try {
        await refreshToken();
        await getUser();

        const authToken = useAuthToken();

        if (!authToken) {
          return;
        }

        reRefreshAccessToken();

        resolve(true);
      } catch (error) {
        reject(error);
      } finally {
        setIsLoading(false);
      }
    });
  };

  return {
    login,
    useAuthUser,
    useAuthToken,
    initAuth,
    useAuthLoading,
  };
};
