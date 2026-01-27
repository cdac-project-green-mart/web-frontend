import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // thanks to vite proxy → goes to http://localhost:3000/api
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add token if you implement authentication later
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;