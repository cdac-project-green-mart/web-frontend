import api from './axios.js';

const BASE = '/api/users';

export async function getProfile() {
    const res = await api.get(`${BASE}/profile`);
    const body = res.data;
    if (!body.success) throw new Error(body.message || 'Failed to fetch profile');
    return body.data;
}

export async function updateProfile(data) {
    const res = await api.put(`${BASE}/profile`, data);
    const body = res.data;
    if (!body.success) throw new Error(body.message || 'Failed to update profile');
    return body.data;
}
