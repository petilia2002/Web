import axios from "axios";
import AuthError from "../exceptions/AuthError";

export const API_URL = "http://localhost:5000/auth/";

export const httpClient = axios.create({
  baseURL: API_URL,
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
  (error) => {}
);
