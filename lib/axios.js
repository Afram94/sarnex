// lib/axios.js (or maybe lib/api.js depending on what you named it)
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://37.27.2.221/api/v1',
});

api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
