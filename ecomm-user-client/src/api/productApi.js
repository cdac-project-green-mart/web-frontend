<<<<<<< HEAD
import api from './axios';

export const getAllProducts = async (params = {}) => {
  const { page = 1, limit = 20, category, search, sort } = params;
  const response = await api.get('/products', {
    params: { page, limit, category, search, sort },
  });
  return response.data;
=======
/**
 * Product API – deployment-repo product-service
 * GET /api/products, GET /api/products?category=&page=&limit=&search=&sortBy=&sortOrder=
 * Response: { success, data: [...products], pagination? }
 */
import api from './axios';

const PRODUCTS_BASE = '/products';

/** Normalize products from API: handles data | data.products | array */
const toProductsArray = (body) => {
  if (Array.isArray(body)) return body;
  const arr = body?.data ?? body?.products;
  return Array.isArray(arr) ? arr : [];
};

export const getAllProducts = async (params = {}) => {
  const { page = 1, limit = 20, category, search, sortBy = 'createdAt', sortOrder = 'desc' } = params;
  const response = await api.get(PRODUCTS_BASE, {
    params: { page, limit, category, search, sortBy, sortOrder },
  });
  const body = response.data;
  const products = toProductsArray(body);
  return products;
>>>>>>> pr-72
};

export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const searchProducts = async (query) => {
<<<<<<< HEAD
  const response = await api.get('/products', { params: { search: query } });
  return response.data;
=======
  const response = await api.get(PRODUCTS_BASE, { params: { search: query, limit: 20 } });
  const body = response.data;
  return toProductsArray(body);
>>>>>>> pr-72
};
