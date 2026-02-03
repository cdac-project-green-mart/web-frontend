import api from './axios.js';

const BASE = '/api/payments';

/** Get vendor's payment/transaction history (sales) */
export async function getPaymentHistory() {
    const res = await api.get(`${BASE}/vendor`);
    const body = res.data;
    if (!body.success) throw new Error(body.message || 'Failed to fetch payments');
    return body.data || [];
}

export async function getTransactionById(transactionId) {
    const res = await api.get(`${BASE}/${transactionId}`);
    const body = res.data;
    if (!body.success) throw new Error(body.message || 'Transaction not found');
    return body.data;
}
