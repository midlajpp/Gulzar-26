import axios from "axios";

const API = axios.create({
  baseURL: "https://icslifefest.in/api", // Adjust based on your backend URL
});

// Add a request interceptor to include the token in headers
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
