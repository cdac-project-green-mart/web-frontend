import axios from 'axios';


const inventoryApi = axios.create({
  baseURL: '/inventory', 
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});


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


export const decreaseStock = async (productId, quantity) => {
  const { data } = await inventoryApi.post(`/${String(productId)}/decrease`, {
    quantity,
  });
  return data;
};


export const increaseStock = async (productId, quantity) => {
  const { data } = await inventoryApi.post(`/${String(productId)}/increase`, {
    quantity,
  });
  return data;
};


export const getLowStockAlerts = async () => {
  try {
    const { data } = await inventoryApi.get('/alerts/low-stock');
    return data;
  } catch (err) {
    console.error('[inventoryApi] getLowStockAlerts:', err);
    return [];
  }
}
