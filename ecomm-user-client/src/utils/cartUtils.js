/**
 * Cart helpers (localStorage). Add/update respect available inventory from backend-inventory-service.
 */

import { getStock } from '../api/inventoryApi';

export const getCartItems = () => {
  try {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  } catch (e) {
    console.error('cartUtils.getCartItems:', e);
    return [];
  }
};

export const saveCartItems = (items) => {
  try {
    localStorage.setItem('cart', JSON.stringify(items));
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  } catch (e) {
    console.error('cartUtils.saveCartItems:', e);
  }
};

/**
 * Add to cart; quantity is capped by available inventory. Uses backend-inventory-service via getStock.
 * @returns {Promise<{ success: boolean, cart: Array, message?: string, capped?: boolean }>}
 */
export const addToCart = async (product, quantity = 1) => {
  const id = product.id ?? product._id;
  const cart = getCartItems();
  const currentQty = cart.find((i) => i.id === id)?.quantity ?? 0;

  let available = Infinity;
  try {
    const stockInfo = await getStock(id);
    if (stockInfo != null && typeof stockInfo.stock === 'number') {
      available = Math.max(0, stockInfo.stock - currentQty);
    }
  } catch (e) {
    console.warn('cartUtils.addToCart: could not fetch stock', e);
  }

  const toAdd = Math.min(Math.max(0, quantity), available);
  if (toAdd <= 0) {
    return {
      success: false,
      cart: getCartItems(),
      message: available === 0 ? 'No more stock available' : 'Cannot add that quantity',
    };
  }

  const idx = cart.findIndex((i) => i.id === id);
  if (idx >= 0) {
    cart[idx].quantity += toAdd;
  } else {
    cart.push({
      id,
      name: product.name ?? product.title,
      price: product.price,
      quantity: toAdd,
      image: product.image ?? product.images?.[0] ?? '/placeholder.jpg',
    });
  }
  saveCartItems(cart);
  return {
    success: true,
    cart: getCartItems(),
    capped: toAdd < quantity,
    message: toAdd < quantity ? `Only ${toAdd} added (stock limit)` : undefined,
  };
};

export const removeFromCart = (productId) => {
  const cart = getCartItems().filter((i) => i.id !== productId);
  saveCartItems(cart);
  return cart;
};

/**
 * Update quantity; new quantity is capped by available inventory from backend-inventory-service.
 * @returns {Promise<Array>} Updated cart
 */
export const updateCartQuantity = async (productId, quantity) => {
  if (quantity < 1) return removeFromCart(productId);
  const cart = getCartItems();
  const idx = cart.findIndex((i) => i.id === productId);
  if (idx < 0) return cart;

  let maxQty = Infinity;
  try {
    const stockInfo = await getStock(productId);
    if (stockInfo != null && typeof stockInfo.stock === 'number') {
      maxQty = Math.max(0, stockInfo.stock);
    }
  } catch (e) {
    console.warn('cartUtils.updateCartQuantity: could not fetch stock', e);
  }

  const cappedQty = Math.min(quantity, maxQty);
  cart[idx].quantity = cappedQty;
  saveCartItems(cart);
  return getCartItems();
};

export const getCartTotalItems = () =>
  getCartItems().reduce((n, i) => n + i.quantity, 0);
