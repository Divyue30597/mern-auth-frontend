import axios from "../api/api";
import useAuth from "./useAuth";

/**
 * we will call this function when the initial requests fails and access token is expired then it
 * will refresh and get a new token we will retry the request.
 */
const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get("/auth/refresh", {
      withCredentials: true,
    });
    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      console.log(response.data.accessToken);
      return {
        ...prev,
        username: response.data.username,
        roles: response.data.roles,
        accessToken: response.data.accessToken,
      };
    });
    return response.data.accessToken;
  };

  console.log(auth);
  return refresh;
};

export default useRefreshToken;
