import axios from "axios";

import { API_BASE } from "../config/env";
const api = axios.create({
  baseURL: API_BASE,
});
/* const api = axios.create({
  baseURL: "http://localhost:8080/api",
}); */

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ✅ HANDLE TOKEN EXPIRY HERE
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      // token expired or invalid
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);

export default api;
