import api from './axios.js';

/**
 * Generate orders report for vendor
 * @param {string} fromDate - Start date in YYYY-MM-DD format
 * @param {string} toDate - End date in YYYY-MM-DD format
 * @param {string} format - 'csv' or 'json'
 * @returns {Promise} - CSV blob or JSON data
 */
export async function generateOrdersReport(fromDate, toDate, format = 'csv') {
    const response = await api.get('/api/reports/vendor/orders', {
        params: { fromDate, toDate, format },
        responseType: format === 'csv' ? 'blob' : 'json'
    });

    if (format === 'csv') {
        // Return blob for CSV download
        return response.data;
    }

    // Return JSON data
    const body = response.data;
    if (body.success && body.data) return body.data;
    throw new Error(body.message || 'Failed to generate report');
}

/**
 * Trigger download of a blob as a file
 */
export function downloadBlob(blob, filename) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}
