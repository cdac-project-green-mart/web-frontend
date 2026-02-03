/**
 * Product API – deployment-repo/docs/API_REFERENCE.md
 * GET /api/products, GET /api/products?category=&page=&limit=, GET /api/products/:id
 * Response: { success, data, pagination? }
 */
import api from './axios';

const PRODUCTS_BASE = '/products';

export const getAllProducts = async (params = {}) => {
  const { page = 1, limit = 20, category, search, sort } = params;
  const response = await api.get(PRODUCTS_BASE, {
    params: { page, limit, category, search, sort },
  });
  const body = response.data;
  // { success, data: [...], pagination: { page, limit, total } }
  return body?.data ?? body;
};

export const getProductById = async (id) => {
  const response = await api.get(`${PRODUCTS_BASE}/${id}`);
  const body = response.data;
  return body?.data ?? body;
};

export const searchProducts = async (query) => {
  const response = await api.get(PRODUCTS_BASE, { params: { search: query, limit: 20 } });
  const body = response.data;
  return body?.data ?? body;
};
