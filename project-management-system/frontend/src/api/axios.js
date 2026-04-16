
import axios from "axios";

const api = axios.create({
  baseURL: " https://project-management-system-fpxs.onrender.com/api" ||  "http://localhost:5000/api"
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = token;
  return config;
});

export default api;