import axios from "axios";
import { useTokenStore } from "@shared/store/useTokenStore.ts";

export const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_ADDRESS}`,
  timeout: 20000,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = useTokenStore.getState().token;
    if (token) {
      config.headers = config.headers || {};
      (config.headers).set?.('Authorization', `Bearer ${token}`);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
)

axiosInstance.interceptors.response.use(null, (error) => {
  if (error.response && error.response.status === 401) {
     useTokenStore.getState().clearToken();
    window.location.replace('/')
  }
})
