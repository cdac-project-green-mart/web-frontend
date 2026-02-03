import api from "./axios.js";

const RETURNS_BASE = "/api/returns";

/**
 * Get all returns for the vendor
 */
export async function getVendorReturns() {
    const res = await api.get(`${RETURNS_BASE}/vendor`);
    const body = res.data;
    if (!body.success) throw new Error(body.message || "Failed to fetch returns");
    return body.data || [];
}

/**
 * Get a specific return by ID
 */
export async function getReturnById(returnId) {
    const res = await api.get(`${RETURNS_BASE}/vendor/${returnId}`);
    const body = res.data;
    if (!body.success) throw new Error(body.message || "Failed to fetch return");
    return body.data;
}

/**
 * Update return status (approve, reject, refund)
 */
export async function updateReturnStatus(returnId, status) {
    const res = await api.put(`${RETURNS_BASE}/vendor/${returnId}/status`, { status });
    const body = res.data;
    if (!body.success) throw new Error(body.message || "Failed to update return status");
    return body.data;
}
