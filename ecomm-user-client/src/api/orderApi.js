/**
 * Order & Cart & Checkout API – deployment-repo/docs/API_REFERENCE.md
 * Cart: GET/POST/PUT/DELETE /api/orders/cart*
 * Orders: GET /api/orders, GET /api/orders/:id (X-User-Id, Authorization)
 * Checkout: POST /api/checkout (SAGA – validates cart, reserves inventory, creates order, payment)
 */
import api from './axios';

const unwrap = (res) => res?.data?.data ?? res?.data ?? res;

// —— Cart (server-side when logged in) ——

export const getCart = async () => {
  const { data } = await api.get('/orders/cart');
  return unwrap({ data });
};

export const addToCart = async (item) => {
  const productId = String(item.productId ?? item.id ?? '').trim();
  const name = String(item.name ?? item.title ?? '').trim();
  const quantity = Math.max(1, Math.floor(Number(item.quantity) || 1));
  const price = Number(item.price);
  if (!productId) throw new Error('Product ID is required');
  if (!name) throw new Error('Product name is required');
  if (Number.isNaN(price) || price < 0) throw new Error('Invalid price');

  const { data } = await api.post('/orders/cart/add', {
    productId,
    name,
    quantity,
    price,
  });
  return unwrap({ data });
};

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

/**
 * Execute checkout. Backend validates cart, reserves inventory, creates order, processes payment.
 * Body: { shippingAddress: { street, city, zip, country }, paymentMethod }
 * Response: { success, message, data: { orderId, transactionId, status, totalAmount } }
 */
export const executeCheckout = async ({ shippingAddress, paymentMethod = 'CREDIT_CARD' }) => {
  const { data } = await api.post('/checkout', {
    shippingAddress: shippingAddress || {},
    paymentMethod,
  });
  return unwrap({ data });
};
