import axios from "axios";
import { getToken, removeToken } from "../context/tokenService";
import { API_BASE } from "../config/env";

const api = axios.create({
  baseURL: API_BASE,
});

api.interceptors.request.use((config) => {

  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,

  async (error) => {

    if (error.response?.status === 401) {

      console.warn("Token expired → logging out");

      removeToken();

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;
