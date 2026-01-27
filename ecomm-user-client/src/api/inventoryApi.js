import axios from 'axios';

/**
 * API client for backend-inventory-service.
 * All inventory/stock data is fetched from backend-inventory-service.
 */
const inventoryApi = axios.create({
  baseURL: '/inventory', // proxied to http://localhost:4001/inventory
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

/**
 * Get stock for a product from backend-inventory-service.
 * @param {string} productId - Product ID
 * @returns {Promise<{ productId, productName, stock } | null>} Stock info or null if not found
 */
export const getStock = async (productId) => {
  try {
    const { data } = await inventoryApi.get(`/${String(productId)}`);
    return data;
  } catch (err) {
    if (err.response?.status === 404) return null;
    console.error(`[inventoryApi] getStock(${productId}):`, err);
    throw err;
  }
};

/**
 * Get stock for multiple products.
 * @param {string[]} productIds - Product IDs
 * @returns {Promise<Record<string, { productId, productName, stock } | null>>} productId -> stock info
 */
export const getStockForProducts = async (productIds) => {
  const entries = await Promise.all(
    productIds.map(async (id) => {
      try {
        const stock = await getStock(id);
        return [id, stock];
      } catch {
        return [id, null];
      }
    })
  );
  return Object.fromEntries(entries);
};

/**
 * Decrease stock (e.g. when adding to cart).
 * @param {string} productId - Product ID
 * @param {number} quantity - Quantity to decrease
 */
export const decreaseStock = async (productId, quantity) => {
  const { data } = await inventoryApi.post(`/${String(productId)}/decrease`, {
    quantity,
  });
  return data;
};

/**
 * Increase stock (e.g. when removing from cart or reducing quantity).
 * @param {string} productId - Product ID
 * @param {number} quantity - Quantity to increase
 */
export const increaseStock = async (productId, quantity) => {
  const { data } = await inventoryApi.post(`/${String(productId)}/increase`, {
    quantity,
  });
  return data;
};

/**
 * Get low-stock alerts from backend-inventory-service.
 */
export const getLowStockAlerts = async () => {
  try {
    const { data } = await inventoryApi.get('/alerts/low-stock');
    return data;
  } catch (err) {
    console.error('[inventoryApi] getLowStockAlerts:', err);
    return [];
  }
}
