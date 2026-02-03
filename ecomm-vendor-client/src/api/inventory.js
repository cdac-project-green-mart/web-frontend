import api from './axios.js';

const BASE = '/api/inventory';

export async function getInventory(productId) {
    const res = await api.get(`${BASE}/${productId}`);
    const body = res.data;
    if (!body.success) throw new Error(body.message || 'Failed to fetch inventory');
    return body.data;
}

export async function setStock(productId, data) {
    const res = await api.put(`${BASE}/${productId}`, data);
    const body = res.data;
    if (!body.success) throw new Error(body.message || 'Failed to update stock');
    return body.data;
}
