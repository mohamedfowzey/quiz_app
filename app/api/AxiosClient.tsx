import axios from "axios";
import Cookies from "js-cookie";

export const API_BASE_URL = "https://upskilling-egypt.com:3005";

const axiosClient = axios.create({
  baseURL: `${API_BASE_URL}`,
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get("auth_token");
    if (token) {
      config.headers.Authorization = token.startsWith("Bearer ")
        ? token
        : `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosClient;
