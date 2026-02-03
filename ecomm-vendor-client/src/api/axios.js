import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("userRole");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add role header for vendor-specific endpoints
    if (userRole) {
      config.headers["X-User-Role"] = userRole;
    }

    // If sending FormData, allow browser/axios to set Content-Type with boundary
    if (config.data instanceof FormData) {
      // remove any preset content-type so axios can set proper multipart boundary
      if (config.headers && config.headers["Content-Type"]) {
        delete config.headers["Content-Type"];
      }
    }

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isAuthEndpoint =
      error.config?.url?.includes("/api/auth/login") ||
      error.config?.url?.includes("/api/auth/register");
    if (error.response?.status === 401 && !isAuthEndpoint) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("userRole");
      localStorage.removeItem("userName");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export function normalizeApiError(error) {
  const status = error.response?.status;
  const data = error.response?.data;
  const message =
    data?.message ||
    (status === 401 && "Please sign in again") ||
    (status === 403 && "Access denied") ||
    (status === 404 && "Not found") ||
    error.message ||
    "Something went wrong";
  return { message, code: data?.error?.code, status };
}

export default api;
