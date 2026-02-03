import api from './axios.js';

/**
 * Get vendor's orders (orders containing the vendor's products)
 */
export async function getVendorOrders() {
    try {
        const res = await api.get('/api/orders/vendor');
        const body = res.data;
        if (body.success && body.data) return body.data;
        return [];
    } catch {
        return [];
    }
}

/**
 * Get a specific order by ID for vendor
 */
export async function getVendorOrderById(orderId) {
    const res = await api.get(`/api/orders/vendor/${orderId}`);
    const body = res.data;
    if (body.success && body.data) return body.data;
    throw new Error(body.message || 'Failed to fetch order');
}
