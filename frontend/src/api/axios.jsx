import axios from "axios";

export const refreshAccessToken = async () => {
  try {
    // Make a request to /refresh to get a new access token
    const response = await axios.get(
      "http://localhost:8088/refreshAccesToken",
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log(`refreshed access token ${response}`);

    const newAccessToken = response.data.accessToken;

    return newAccessToken;
  } catch (error) {
    throw error;
  }
};

const createAxiosInstance = ({ user, setUser }) => {
  const instance = axios.create();

  // Add a request interceptor to include the access token in every request
  instance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${user}`;
    return config;
  });

  // Add a response interceptor to handle token refresh on a 401 error
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      // If the request response is 401 (Unauthorized), try to refresh the token
      if (error.response && error.response.status === 403) {
        try {
          const refreshedToken = await refreshAccessToken();

          // Update the user state with the new access token
          setUser(refreshedToken);

          // Retry the request with the new access token
          const config = error.config;
          config.headers.Authorization = `Bearer ${refreshedToken}`;
          return axios.request(config);
        } catch (refreshError) {
          // Handle refresh error
          throw refreshError;
        }
      }

      // For other errors, reject the promise
      return Promise.reject(error);
    }
  );

  return instance;
};

export default createAxiosInstance;
