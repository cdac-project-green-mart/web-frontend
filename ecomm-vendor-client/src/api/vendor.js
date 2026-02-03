/**
 * Re-export product helpers for backward compatibility.
 * Prefer importing from api/products.js directly.
 */
export {
    getVendorProducts,
    createVendorProduct,
    updateVendorProduct,
    deleteVendorProduct,
} from './products.js';
export { getVendorOrders } from './orders.js';
