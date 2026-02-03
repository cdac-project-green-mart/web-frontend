import api from './axios.js';

/**
 * Get current user's profile
 */
export async function getUserProfile() {
    const res = await api.get('/api/users/profile');
    const body = res.data;
    if (!body.success) throw new Error(body.message || 'Failed to fetch profile');
    return body.data;
}

/**
 * Update user profile
 */
export async function updateUserProfile(data) {
    const res = await api.put('/api/users/profile', data);
    const body = res.data;
    if (!body.success) throw new Error(body.message || 'Failed to update profile');
    return body.data;
}
