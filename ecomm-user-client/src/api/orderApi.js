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
