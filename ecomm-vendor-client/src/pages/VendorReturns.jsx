import { useState, useMemo, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { getVendorReturns, updateReturnStatus } from '../api/returns'
import { normalizeApiError } from '../api/axios'

export default function VendorReturns() {
  const [returns, setReturns] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedIds, setSelectedIds] = useState(new Set())
  const [openMenuId, setOpenMenuId] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [dateFilter, setDateFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [updating, setUpdating] = useState(null)

  const loadReturns = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const data = await getVendorReturns()
      setReturns(data)
    } catch (err) {
      setError(normalizeApiError(err).message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadReturns()
  }, [loadReturns])

  // Filtered returns based on search and filters
  const filteredReturns = useMemo(() => {
    return returns.filter((r) => {
      const query = searchQuery.toLowerCase().trim()
      const matchesSearch = query === '' ||
        (r.productName?.toLowerCase() || '').includes(query) ||
        (r.trackingId?.toLowerCase() || '').includes(query) ||
        (r.orderId?.toString() || '').includes(query)

      const matchesStatus = statusFilter === '' || r.status === statusFilter

      // Date filter (simple implementation)
      if (dateFilter && r.createdAt) {
        const returnDate = new Date(r.createdAt)
        const now = new Date()
        if (dateFilter === 'last-7') {
          const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
          if (returnDate < sevenDaysAgo) return false
        } else if (dateFilter === 'last-30') {
          const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
          if (returnDate < thirtyDaysAgo) return false
        }
      }

      return matchesSearch && matchesStatus
    })
  }, [returns, searchQuery, statusFilter, dateFilter])

  const totalRefundValue = useMemo(() => filteredReturns.reduce((sum, r) => sum + (Number(r.refundAmount) || 0), 0), [filteredReturns])
  const isAllSelected = filteredReturns.length > 0 && selectedIds.size === filteredReturns.length

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(new Set(filteredReturns.map(r => r.id)))
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

  const toggleMenu = (id, e) => {
    e.stopPropagation()
    setOpenMenuId(openMenuId === id ? null : id)
  }

  const handleUpdateStatus = async (returnId, status) => {
    setUpdating(returnId)
    setOpenMenuId(null)
    try {
      await updateReturnStatus(returnId, status)
      loadReturns()
    } catch (err) {
      setError(normalizeApiError(err).message)
    } finally {
      setUpdating(null)
    }
  }

  useEffect(() => {
    const handleClickOutside = () => setOpenMenuId(null)
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  if (loading) {
    return (
      <div className="space-y-6 font-sans text-gray-800">
        <h1 className="text-xl font-semibold text-gray-800">Returned Orders</h1>
        <p className="text-gray-500">Loading returns...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 font-sans text-gray-800">
      <h1 className="text-xl font-semibold text-gray-800">Returned Orders</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-800">
          {error}
        </div>
      )}

      {/* Filter Row */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-grow max-w-lg">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input
            type="text"
            placeholder="Search by Order ID, Product Name, or Tracking ID"
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-gray-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <select
          className="px-4 py-2 border border-gray-200 rounded-md text-sm bg-gray-50 text-gray-600 focus:outline-none"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        >
          <option value="">All Dates</option>
          <option value="last-7">Last 7 Days</option>
          <option value="last-30">Last 30 Days</option>
        </select>

        <select
          className="px-4 py-2 border border-gray-200 rounded-md text-sm bg-gray-50 text-gray-600 focus:outline-none"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
          <option value="REFUNDED">Refunded</option>
        </select>

        <div className="ml-auto text-sm text-gray-500 flex items-center gap-2">
          <span>↺</span>
          <span>Total: {filteredReturns.length} return(s)</span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-visible">
        <table className="w-full text-sm text-left">
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
              <th className="p-4 font-medium">Product</th>
              <th className="p-4 font-medium">Order ID</th>
              <th className="p-4 font-medium">Return Reason</th>
              <th className="p-4 font-medium">Return Date</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Tracking ID</th>
              <th className="p-4 font-medium">Amount</th>
              <th className="p-4 font-medium text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredReturns.length === 0 ? (
              <tr>
                <td colSpan={9} className="p-8 text-center text-gray-500">
                  {searchQuery || statusFilter || dateFilter
                    ? 'No returns match your filters.'
                    : 'No return requests yet.'}
                </td>
              </tr>
            ) : (
              filteredReturns.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="p-4 align-middle">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 cursor-pointer"
                      checked={selectedIds.has(item.id)}
                      onChange={() => handleSelectOne(item.id)}
                    />
                  </td>
                  <td className="p-4 align-middle">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 border border-gray-200 rounded-sm flex items-center justify-center text-gray-400">📦</div>
                      <span className="text-gray-700">{item.productName || 'Unknown Product'}</span>
                    </div>
                  </td>
                  <td className="p-4 align-middle">
                    <Link to={`/order-details/${item.orderId}`} className="text-blue-500 hover:underline">
                      {item.orderId?.toString().slice(0, 8)}...
                    </Link>
                  </td>
                  <td className="p-4 align-middle text-gray-600">{item.reason || '—'}</td>
                  <td className="p-4 align-middle text-gray-600">
                    {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : '—'}
                  </td>
                  <td className="p-4 align-middle">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="p-4 align-middle">
                    <span className="text-blue-500 hover:underline cursor-pointer">{item.trackingId || '—'}</span>
                  </td>
                  <td className="p-4 align-middle font-medium text-gray-700">₹{Number(item.refundAmount || 0).toFixed(2)}</td>
                  <td className="p-4 align-middle text-center relative">
                    <button
                      onClick={(e) => toggleMenu(item.id, e)}
                      className="px-2 py-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
                      disabled={updating === item.id}
                    >
                      {updating === item.id ? '...' : '⋮'}
                    </button>

                    {openMenuId === item.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-20 text-left py-1">
                        <Link to={`/order-details/${item.orderId}`} className="block w-full px-4 py-2 text-xs text-gray-700 hover:bg-gray-50">
                          👁 View Order Details
                        </Link>
                        {item.status === 'PENDING' && (
                          <>
                            <button
                              onClick={() => handleUpdateStatus(item.id, 'APPROVED')}
                              className="w-full px-4 py-2 text-xs text-green-600 hover:bg-gray-50 flex items-center gap-2"
                            >
                              ✓ Approve Return
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(item.id, 'REJECTED')}
                              className="w-full px-4 py-2 text-xs text-red-600 hover:bg-gray-50 flex items-center gap-2"
                            >
                              ✕ Reject Return
                            </button>
                          </>
                        )}
                        {item.status === 'APPROVED' && (
                          <button
                            onClick={() => handleUpdateStatus(item.id, 'REFUNDED')}
                            className="w-full px-4 py-2 text-xs text-blue-600 hover:bg-gray-50 flex items-center gap-2 font-medium"
                          >
                            💰 Process Refund
                          </button>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Info */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600">
        <div className="flex flex-wrap gap-1">
          <span>📦 {filteredReturns.length} return(s)</span>
          <span className="hidden sm:inline">•</span>
          <span>Total Refund Value: ₹{totalRefundValue.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        <span className="text-sm text-gray-500">
          Showing {filteredReturns.length} of {returns.length} return(s)
          {(searchQuery || statusFilter || dateFilter) && ' (filtered)'}
        </span>
      </div>
    </div>
  )
}

function StatusBadge({ status }) {
  let styles = ''
  let label = status
  switch (status) {
    case 'PENDING':
      styles = 'bg-yellow-50 text-yellow-600 border border-yellow-200'
      label = 'Pending'
      break
    case 'APPROVED':
      styles = 'bg-blue-50 text-blue-600 border border-blue-200'
      label = 'Approved'
      break
    case 'REJECTED':
      styles = 'bg-red-50 text-red-600 border border-red-200'
      label = 'Rejected'
      break
    case 'REFUNDED':
      styles = 'bg-green-50 text-green-600 border border-green-200'
      label = 'Refunded'
      break
    default:
      styles = 'bg-gray-50 text-gray-600 border border-gray-200'
  }

  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${styles}`}>
      {label}
    </span>
  )
}
