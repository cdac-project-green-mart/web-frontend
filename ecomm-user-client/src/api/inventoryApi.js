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
 * deployment-repo returns: { items: [{ productId, available (number), sufficient }], allAvailable }
 */
export const getStockForProducts = async (productIds) => {
  if (!productIds?.length) return {};
  try {
    const result = await checkStock(productIds.map((id) => ({ productId: id, quantity: 1 })));
    const items = result?.items ?? [];
    return Object.fromEntries(
      items.map((i) => [
        i.productId,
        {
          stock: i.stock ?? (typeof i.available === 'number' ? i.available : 0),
          available: i.sufficient !== false,
        },
      ])
    );
  } catch (_) {
    const fallback = {};
    for (const id of productIds) {
      try {
        const s = await getStock(id);
        fallback[id] = s ? { stock: s.stock ?? s.quantity, available: true } : { stock: 0, available: false };
      } catch {
        fallback[id] = { stock: 0, available: false };
      }
    }
    return fallback;
  }
};
