import axios from "axios";
import ApiError from "../exceptions/ApiError";
import AuthError from "../exceptions/AuthError";

export const API_URL = "http://localhost:5000";
export const AUTH_URL = "http://localhost:5000/auth";

export const httpClient = axios.create({
  baseURL: AUTH_URL,
  withCredentials: true,
});

httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

httpClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    originalRequest._isRetry = true;
    if (
      error.response &&
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      try {
        const result = await axios.get(`${AUTH_URL}/refresh`, {
          withCredentials: true,
        });
        localStorage.setItem("token", result.data.access_token);
        return httpClient.request(originalRequest);
      } catch (e) {
        localStorage.removeItem("token");
        const message = e.response?.data?.message;
        return Promise.reject(new AuthError(message, e.response?.status));
      }
    }
    return Promise.reject(error);
  }
);
