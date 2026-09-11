import axios from 'axios';

const API_URL = 'http://localhost:5000/api';
// Nanti ganti ke production: https://task-manager-api-production-be.up.railway.app/api

// buat instance/baseURL axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor: tambahkan token ke setiap request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;