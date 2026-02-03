import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getPaymentHistory } from '../api/payments'
import { normalizeApiError } from '../api/axios'

function formatDate(val) {
  if (!val) return '—'
  const d = new Date(val)
  return isNaN(d.getTime()) ? String(val) : d.toLocaleDateString()
}

export default function VendorPayments() {
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedIds, setSelectedIds] = useState(new Set())
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    getPaymentHistory()
      .then((data) => setPayments(Array.isArray(data) ? data : []))
      .catch((err) => setError(normalizeApiError(err).message))
      .finally(() => setLoading(false))
  }, [])

  const stats = {
    totalPaid: payments.filter((p) => p.status === 'COMPLETED').reduce((s, p) => s + Number(p.amount || 0), 0),
    refunds: payments.filter((p) => p.status === 'REFUNDED').reduce((s, p) => s + Number(p.amount || 0), 0),
    netEarnings: payments.filter((p) => p.status === 'COMPLETED').reduce((s, p) => s + Number(p.amount || 0), 0) -
      payments.filter((p) => p.status === 'REFUNDED').reduce((s, p) => s + Number(p.amount || 0), 0),
  }

  // Checkbox Handlers
  const isAllSelected = payments.length > 0 && selectedIds.size === payments.length

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(new Set(payments.map((p) => p.id)))
    } else {
      setSelectedIds(new Set())
    }
  }

  const handleSelectOne = (id) => {
    const newSelected = new Set(selectedIds)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedIds(newSelected)
  }

  return (
    <div className="space-y-6 font-sans text-gray-800">
      <h1 className="text-xl font-semibold text-gray-800">Payments</h1>

      {error && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}
      {loading && <p className="text-gray-500">Loading payments...</p>}

      {/* Filter Row */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-grow max-w-lg">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input
            type="text"
            placeholder="Search by Order ID, Transaction ID, or Reference ID"
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-gray-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <select className="px-4 py-2 border border-gray-200 rounded-md text-sm bg-gray-50 text-gray-600 focus:outline-none">
          <option>Date</option>
          <option>Last 7 Days</option>
          <option>This Month</option>
        </select>

        <select className="px-4 py-2 border border-gray-200 rounded-md text-sm bg-gray-50 text-gray-600 focus:outline-none">
          <option>Status</option>
          <option>Payment Received</option>
          <option>Refund Processed</option>
        </select>

        <button className="px-5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-md transition-colors">
          Apply
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Paid Amount" value={stats.totalPaid} icon="💵" />
        <StatCard title="Total Refunds" value={stats.refunds} icon="💸" />
        <StatCard title="Net Earnings" value={stats.netEarnings} icon="📅" highlight />
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-visible">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-gray-500 uppercase bg-white border-b border-gray-200">
              <tr>
                <th className="p-4 w-10">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 cursor-pointer"
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="p-4 font-medium">Order ID</th>
                <th className="p-4 font-medium">Payment Date</th>
                <th className="p-4 font-medium">Transaction ID</th>
                <th className="p-4 font-medium">Transaction Type</th>
                <th className="p-4 font-medium">Order Amount</th>
                <th className="p-4 font-medium">Ship. Charge</th>
                <th className="p-4 font-medium">Plat. Fee</th>
                <th className="p-4 font-medium">Return Fee</th>
                <th className="p-4 font-medium">Tax</th>
                <th className="p-4 font-medium">Final Payout</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {payments.map((p) => {
                const id = p.transactionId || p.id
                const amount = Number(p.amount) || 0
                const status = p.status || '—'
                return (
                  <tr key={id} className="hover:bg-gray-50">
                    <td className="p-4 align-middle">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 cursor-pointer"
                        checked={selectedIds.has(id)}
                        onChange={() => handleSelectOne(id)}
                      />
                    </td>
                    <td className="p-4 align-middle text-gray-500 font-medium">
                      <Link to={`/order-details/${p.orderId || ''}`} className="text-blue-500 hover:underline">
                        {p.orderId || '—'}
                      </Link>
                    </td>
                    <td className="p-4 align-middle text-gray-500">{formatDate(p.createdAt)}</td>
                    <td className="p-4 align-middle text-gray-500">{id}</td>
                    <td className="p-4 align-middle">
                      <span
                        className={`px-2 py-1 rounded border text-xs font-medium ${status === 'COMPLETED' ? 'bg-green-50 text-green-600 border-green-200' :
                          status === 'REFUNDED' ? 'bg-red-50 text-red-600 border-red-200' :
                            'bg-gray-50 text-gray-600 border-gray-200'
                          }`}
                      >
                        {status}
                      </span>
                    </td>
                    <td className="p-4 align-middle text-gray-600">₹{amount.toFixed(2)}</td>
                    <td className="p-4 align-middle text-gray-400">—</td>
                    <td className="p-4 align-middle text-gray-400">—</td>
                    <td className="p-4 align-middle text-gray-400">—</td>
                    <td className="p-4 align-middle text-gray-400">—</td>
                    <td className="p-4 align-middle font-semibold text-gray-700">₹{amount.toFixed(2)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer / Summary */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
        <div className="flex flex-wrap gap-1 items-center">
          <span>📊 {payments.length} payment(s)</span>
          <span className="hidden sm:inline">•</span>
          <span>Total Paid ₹{stats.totalPaid.toFixed(2)}</span>
          <span className="hidden sm:inline">•</span>
          <span>Refunds ₹{stats.refunds.toFixed(2)}</span>
          <span className="hidden sm:inline">•</span>
          <span>Net ₹{stats.netEarnings.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-0">
        <span className="text-sm text-gray-500">Showing {payments.length} payment(s)</span>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 border border-gray-200 rounded text-gray-600 hover:bg-gray-50 disabled:opacity-50 text-sm" disabled>Prev</button>
          <button className="px-3 py-1.5 border border-gray-200 rounded text-gray-600 hover:bg-gray-50 text-sm">Next</button>
        </div>
      </div>
    </div>
  )
}

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5 flex flex-col justify-between h-full">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm">{icon}</span>
        <span className="text-sm text-gray-500 font-medium">{title}</span>
      </div>
      <div className="text-2xl font-semibold text-gray-800">
        ₹{Number(value).toFixed(2)}
      </div>
    </div>
  )
}
