import api from './axios.js';

const BASE = '/api/products';

/** Get current vendor's products (backend: GET /api/products/vendor/me) */
export async function getVendorProducts() {
    const res = await api.get(`${BASE}/vendor/me`);
    const body = res.data;
    if (!body.success) throw new Error(body.message || 'Failed to fetch products');
    return body.data || [];
}

export async function createVendorProduct(productData) {
    const res = await api.post(BASE, productData);
    const body = res.data;
    if (!body.success) throw new Error(body.message || 'Failed to create product');
    return body.data;
}

export async function updateVendorProduct(id, data) {
    const res = await api.put(`${BASE}/${id}`, data);
    const body = res.data;
    if (!body.success) throw new Error(body.message || 'Failed to update product');
    return body.data;
}

export async function deleteVendorProduct(id) {
    const res = await api.delete(`${BASE}/${id}`);
    const body = res.data;
    if (!body.success) throw new Error(body.message || 'Failed to delete product');
    return body.data;
}

export async function getProductById(id) {
    const res = await api.get(`${BASE}/${id}`);
    const body = res.data;
    if (!body.success) throw new Error(body.message || 'Product not found');
    return body.data;
}
