// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://13.201.150.234/t2/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 Add token to all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // or sessionStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
