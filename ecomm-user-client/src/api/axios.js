/**
 * Axios instance for Green Mart API.
 * All requests go through API Gateway (see deployment-repo/docs/API_REFERENCE.md).
 * Base URL /api → proxied to gateway (local: 8080).
 */
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth: Bearer token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  // X-User-Id required for orders, cart, checkout, payments (per API_REFERENCE)
  const user = localStorage.getItem('user');
  if (user) {
    try {
      const u = JSON.parse(user);
      const userId = u.id ?? u._id ?? u.email;
      if (userId) config.headers['X-User-Id'] = String(userId);
    } catch (_) {}
  }
  return config;
});

export default api;
