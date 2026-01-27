import api from './axios';

export const getAllProducts = async (params = {}) => {
  const { page = 1, limit = 20, category, search, sort } = params;
  const response = await api.get('/v1/products', {
    params: { page, limit, category, search, sort },
  });
  return response.data;
};

export const getProductById = async (id) => {
  const response = await api.get(`/v1/products/${id}`);
  return response.data;
};

export const searchProducts = async (query) => {
  const response = await api.get('/v1/products', { params: { search: query } });
  return response.data;
};
