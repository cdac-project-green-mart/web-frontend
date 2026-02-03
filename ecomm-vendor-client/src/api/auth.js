import api from "./axios.js";

const AUTH_BASE = "/api/auth";

export async function register(data) {
  const payload = {
    name: data.name,
    email: data.email,
    password: data.password,
    role: data.role || "VENDOR",
  };
  const res = await api.post(`${AUTH_BASE}/register`, payload);
  const body = res.data;
  if (!body.success || !body.user)
    throw new Error(body.message || "Registration failed");
  return body.user;
}

export async function login({ email, password }) {
  const res = await api.post(`${AUTH_BASE}/login`, { email, password });
  const body = res.data;
  if (!body.success || !body.token || !body.user)
    throw new Error(body.message || "Login failed");
  return { token: body.token, user: body.user };
}

export async function validateToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const res = await api.get(`${AUTH_BASE}/validate`);
    const body = res.data;
    if (body.success && body.data) return body.data;
    return null;
  } catch {
    return null;
  }
}
