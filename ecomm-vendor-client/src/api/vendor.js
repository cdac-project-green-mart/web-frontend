import api from './axios';

// Get products for the current vendor
export const getVendorProducts = async () => {
    // Determine vendorId from local user storage for now, or just use AUTH token
    // The backend uses req.user.id from token, so we just need to send the token (axios interceptor handles it)
    // We pass vendorId as query param if needed, or backend can infer from token.
    // Our backend implementation: Product Service filters by ?vendorId=...
    // But wait, if I am a vendor, I want to see MY products.
    // Ideally, backend should have a /vendor/products endpoint or /products/me.
    // I implemented `getProducts` to filter by `query.vendorId`.

    // We need to get the current user ID to pass as vendorId
    const userStr = localStorage.getItem('user');
    let userId = '';
    if (userStr) {
        try {
            const user = JSON.parse(userStr);
            userId = user._id || user.id;
        } catch (e) {
            console.error("Error parsing user", e);
        }
    }

    const response = await api.get(`/products?vendorId=${userId}`);
    return response.data.data;
};

export const createVendorProduct = async (productData) => {
    const response = await api.post('/products', productData);
    return response.data.data;
};

export const updateVendorProduct = async (id, data) => {
    const response = await api.put(`/products/${id}`, data);
    return response.data.data;
};

export const deleteVendorProduct = async (id) => {
    const response = await api.delete(`/products/${id}`);
    return response.data.data;
};

export const getVendorOrders = async () => {
    const response = await api.get('/orders/vendor');
    return response.data.data;
};
