/**
 * Inventory API – deployment-repo
 * GET /api/inventory/:productId
 * POST /api/inventory/check-availability
 */
import api from './axios';

/**
 * Get inventory for a product.
 * Response: { success, data: { productId, quantity, lowStockThreshold, ... } }
 */
export const getStock = async (productId) => {
  try {
    const { data } = await api.get(`/inventory/${String(productId)}`);
    const payload = data?.data ?? data;
    return payload != null ? { stock: payload.quantity ?? payload.stock, ...payload } : null;
  } catch (err) {
    if (err.response?.status === 404 || err.response?.status === 401) return null;
    console.error(`[inventoryApi] getStock(${productId}):`, err);
    throw err;
  }
};

/**
 * Check stock availability for multiple items.
 * POST /api/inventory/check-availability body: { items: [{ productId, quantity }, ...] }
 * Response: { success, data: { available, items: [{ productId, available, stock }] } }
 */
export const checkStock = async (items) => {
  const { data } = await api.post('/inventory/check-availability', {
    items: items.map((i) => ({ productId: String(i.productId ?? i.id), quantity: i.quantity ?? 1 })),
  });
  return data?.data ?? data;
};

/**
 * Build a map productId -> { stock, available } from checkStock.
 * deployment-repo inventory checkAvailability returns:
 * { items: [{ productId, requested, available (qty), sufficient }], allAvailable }
 */
export const getStockForProducts = async (productIds) => {
  if (!productIds?.length) return {};
  try {
    const result = await checkStock(productIds.map((id) => ({ productId: id, quantity: 1 })));
    const items = result?.items ?? [];
    return Object.fromEntries(
      items.map((i) => [
        String(i.productId),
        {
          stock: typeof i.available === 'number' ? i.available : (i.stock ?? 0),
          available: i.sufficient !== false,
        },
      ])
    );
  } catch (err) {
    // If auth error (401/403), return null stock to indicate "unknown" rather than "out of stock"
    const status = err.response?.status;
    if (status === 401 || status === 403) {
      console.warn('[inventoryApi] Auth required for stock check - returning null stock');
      return Object.fromEntries(productIds.map((id) => [String(id), { stock: null, available: true }]));
    }
    // For other errors, try individual fetches as fallback
    const fallback = {};
    for (const id of productIds) {
      try {
        const s = await getStock(id);
        fallback[id] = s ? { stock: s.stock ?? s.quantity, available: true } : { stock: 0, available: false };
      } catch (e) {
        // If auth error on individual fetch, return null (unknown) not 0 (out of stock)
        if (e.response?.status === 401 || e.response?.status === 403) {
          fallback[id] = { stock: null, available: true };
        } else {
          fallback[id] = { stock: 0, available: false };
        }
      }
    }
    return fallback;
  }
};
