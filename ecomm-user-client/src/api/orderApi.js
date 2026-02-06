import api from './axios';

/**
 * Create order from cart
 * @param {Object} params
 * @param {string} params.userId - User ID (email or id)
 * @param {string} params.userEmail - User email
 * @param {Array} params.items - Cart items [{ id, name, price, quantity, image }]
 * @param {Object} params.shippingAddress - { name, email, street, city, zip, phone }
 */
export const createOrder = async ({ userId, userEmail, items, shippingAddress }) => {
  const { data } = await api.post('/orders', {
    userId,
    userEmail,
    items: items.map((item) => ({
      id: String(item.id),
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
    })),
    shippingAddress: shippingAddress || {},
  });
  return data?.data ?? data;
};

<<<<<<< HEAD
=======
export const updateCartItem = async (productId, quantity) => {
  const { data } = await api.put('/orders/cart/update', null, {
    params: { productId: String(productId), quantity },
  });
  return unwrap({ data });
};

export const removeFromCartApi = async (productId) => {
  const { data } = await api.delete('/orders/cart/remove', {
    params: { productId: String(productId) },
  });
  return unwrap({ data });
};

export const clearCart = async () => {
  const { data } = await api.delete('/orders/cart/clear');
  return unwrap({ data });
};

// —— Orders ——

export const getOrders = async () => {
  const { data } = await api.get('/orders');
  const payload = unwrap({ data });
  return Array.isArray(payload) ? payload : payload?.data ?? [];
};

export const getOrderById = async (orderId) => {
  const { data } = await api.get(`/orders/${orderId}`);
  return unwrap({ data });
};

// —— Checkout (SAGA: cart → inventory → order → payment) ——

>>>>>>> pr-72
/**
 * Get user orders
 */
export const getOrders = async (userId) => {
  const { data } = await api.get('/orders', { params: { userId } });
  return data?.data ?? data;
};

/**
 * Get order by ID
 */
export const getOrderById = async (orderId, userId) => {
  const { data } = await api.get(`/orders/${orderId}`, { params: { userId } });
  return data?.data ?? data;
};

/**
 * Process mock payment for order
 */
export const processPayment = async (orderId, userId, paymentDetails = {}) => {
  const { data } = await api.post(`/orders/${orderId}/pay`, paymentDetails, {
    params: { userId },
  });
  return data?.data ?? data;
};
