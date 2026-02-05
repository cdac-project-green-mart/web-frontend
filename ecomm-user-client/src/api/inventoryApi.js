import api from './axios';


export const getStock = async (productId) => {
  try {
    const { data } = await api.get(`/inventory/${String(productId)}`);
    return data;
  } catch (err) {
    if (err.response?.status === 404) return null;
    console.error(`[inventoryApi] getStock(${productId}):`, err);
    throw err;
  }
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
  } catch (_) {
    const fallback = {};
    for (const id of productIds) {
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


export const decreaseStock = async (productId, quantity) => {
  const { data } = await api.post(`/inventory/${String(productId)}/decrease`, {
    quantity,
  });
  return data;
};


export const increaseStock = async (productId, quantity) => {
  const { data } = await api.post(`/inventory/${String(productId)}/increase`, {
    quantity,
  });
  return data;
};


export const getLowStockAlerts = async () => {
  try {
    const { data } = await api.get('/inventory/alerts/low-stock');
    return data;
  } catch (err) {
    console.error('[inventoryApi] getLowStockAlerts:', err);
    return [];
  }
}
