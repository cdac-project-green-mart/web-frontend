/**
 * Auth API – deployment-repo/docs/API_REFERENCE.md
 * POST /api/auth/register, POST /api/auth/login, GET /api/auth/validate
 */
import api from './axios';

export const register = async (name, email, password, role = 'CUSTOMER') => {
  const { data } = await api.post('/auth/register', { name, email, password, role });
  // Response 201: { success, message, data: { id, email, name, role } }
  return data;
};

export const login = async (email, password) => {
  const { data } = await api.post('/auth/login', { email, password });
  // Response 200: { success, token, data: { id, email, name, role } } (or user in some backends)
  return data;
};

export const validateToken = async () => {
  const { data } = await api.get('/auth/validate');
  return data;
};

/**
 * Normalize error from backend to a single user-friendly string.
 */
export function getAuthErrorMessage(err) {
  if (!err) return 'Something went wrong.';
  const res = err.response;
  if (!res) return err.message || 'Unable to connect. Please try again.';
  const status = res.status;
  const body = res.data;
  const contentType = res.headers?.['content-type'] || '';

  if (typeof body === 'string' && (contentType.includes('text/html') || body.trimStart().startsWith('<'))) {
    if (body.includes('Cannot POST') || body.includes('Cannot GET')) {
      return 'Auth service unavailable. Make sure the API gateway is running.';
    }
    return 'Server returned an error. Check the API gateway.';
  }

  const message = typeof body === 'string' ? body : body?.message;
  const data = body?.data;

  if (status === 401) return message || 'Invalid email or password.';
  if (status === 409) return message || 'Email already registered.';
  if (status === 400) {
    if (data && typeof data === 'object' && !Array.isArray(data)) {
      const parts = Object.entries(data).map(([field, msg]) => `${field}: ${msg}`);
      return parts.length ? parts.join(' ') : (message || 'Invalid input.');
    }
    return message || 'Invalid input.';
  }
  if (status >= 500) return message || 'Server error. Please try again later.';
  return message || 'Something went wrong.';
}
