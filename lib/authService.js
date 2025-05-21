// lib/authService.js

import api from './axios';

export const register = async (data) => {
  const res = await api.post('/register', data);
  localStorage.setItem('token', res.data.access_token); // ✅ fix here
  return res.data;
};

export const login = async (data) => {
  const res = await api.post('/login', data);
  localStorage.setItem('token', res.data.access_token); // ✅ fix here
  return res.data;
};
export const logout = async () => {
  await api.post('/logout');
  localStorage.removeItem('token');
};

export const getUser = async () => {
  const res = await api.get('/user');
  return res.data;
};
