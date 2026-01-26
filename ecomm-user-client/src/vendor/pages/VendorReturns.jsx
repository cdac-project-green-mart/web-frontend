import { useState, useMemo, useEffect } from 'react'

const MOCK_RETURNS = [
  {
    id: 'RET-001',
    productName: 'Blue T-Shirt',
    orderId: '#ORD-10280',
    returnReason: 'Size too small',
    returnDate: '02 Oct 2025',
    refundStatus: 'Refund Pending',
    returnTrackingId: 'RTK12345',
    amount: 499,
  },
  {
    id: 'RET-002',
    productName: 'Coffee Mug',
    orderId: '#ORD-10281',
    returnReason: 'Broken on delivery',
    returnDate: '03 Oct 2025',
    refundStatus: 'Refund Initiated',
    returnTrackingId: 'RTK12368',
    amount: 299,
  },
  {
    id: 'RET-003',
    productName: 'Notebook',
    orderId: '#ORD-10282',
    returnReason: 'Customer changed mind',
    returnDate: '04 Oct 2025',
    refundStatus: 'Refund Completed',
    returnTrackingId: 'RTK12401',
    amount: 149,
  },
  // Adding more mock data to fill the table slightly
  {
    id: 'RET-004',
    productName: 'Wireless Mouse',
    orderId: '#ORD-10285',
    returnReason: 'Defective item',
    returnDate: '06 Oct 2025',
    refundStatus: 'Refund Pending',
    returnTrackingId: 'RTK12555',
    amount: 899,
  },
  {
    id: 'RET-005',
    productName: 'Desk Lamp',
    orderId: '#ORD-10288',
    returnReason: 'Damaged packaging',
    returnDate: '07 Oct 2025',
    refundStatus: 'Refund Completed',
    returnTrackingId: 'RTK12601',
    amount: 1200,
  }
]

export default function VendorReturns() {
  const [returns, setReturns] = useState(MOCK_RETURNS)
  const [selectedIds, setSelectedIds] = useState(new Set())
  const [openMenuId, setOpenMenuId] = useState(null)

  // Filters state (visual only for now)
  const [searchQuery, setSearchQuery] = useState('')
  const [dateFilter, setDateFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  // Derived state
  const totalRefundValue = useMemo(() => returns.reduce((sum, r) => sum + r.amount, 0), [returns])
  const isAllSelected = returns.length > 0 && selectedIds.size === returns.length

  // Handlers
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(new Set(returns.map(r => r.id)))
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
    e.stopPropagation() // Prevent row click or other events
    setOpenMenuId(openMenuId === id ? null : id)
  }

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setOpenMenuId(null)
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  return (
    <div className="space-y-6 font-sans text-gray-800">
      <h1 className="text-xl font-semibold text-gray-800">Returned Orders</h1>

      {/* Filter Row */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-grow max-w-lg">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input
            type="text"
            placeholder="Search by Order ID, Product Name, Buyer Name, or Return Tracking ID"
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
          <option value="">Date</option>
          <option value="last-7">Last 7 Days</option>
          <option value="last-30">Last 30 Days</option>
        </select>

        <select
          className="px-4 py-2 border border-gray-200 rounded-md text-sm bg-gray-50 text-gray-600 focus:outline-none"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Refund Status</option>
          <option value="pending">Refund Pending</option>
          <option value="initiated">Refund Initiated</option>
          <option value="completed">Refund Completed</option>
        </select>

        <button className="px-5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-md transition-colors">
          Apply
        </button>

        <div className="ml-auto text-sm text-gray-500 flex items-center gap-2">
          <span>↺</span>
          <span>Total Returned Orders: {returns.length}</span>
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
              <th className="p-4 font-medium">Refund Status</th>
              <th className="p-4 font-medium">Return Tracking ID</th>
              <th className="p-4 font-medium">Amount</th>
              <th className="p-4 font-medium text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {returns.map((item) => (
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
                    <div className="w-10 h-10 bg-gray-100 border border-gray-200 rounded-sm"></div> {/* Placeholder Image */}
                    <span className="text-gray-700">{item.productName}</span>
                  </div>
                </td>
                <td className="p-4 align-middle">
                  <span className="text-blue-500 hover:underline cursor-pointer">{item.orderId}</span>
                </td>
                <td className="p-4 align-middle text-gray-600">{item.returnReason}</td>
                <td className="p-4 align-middle text-gray-600">{item.returnDate}</td>
                <td className="p-4 align-middle">
                  <StatusBadge status={item.refundStatus} />
                </td>
                <td className="p-4 align-middle">
                  <span className="text-blue-500 hover:underline cursor-pointer">{item.returnTrackingId}</span>
                </td>
                <td className="p-4 align-middle font-medium text-gray-700">₹{item.amount}</td>
                <td className="p-4 align-middle text-center relative">
                  <button
                    onClick={(e) => toggleMenu(item.id, e)}
                    className="px-2 py-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
                  >
                    ⋮
                  </button>

                  {/* Dropdown Menu */}
                  {openMenuId === item.id && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-20 text-left py-1">
                      <button className="w-full px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                        👁 View Return Details
                      </button>
                      <button className="w-full px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                        📄 Download Invoice
                      </button>
                      <button className="w-full px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                        🚚 View Return Tracking
                      </button>
                      <button className="w-full px-4 py-2 text-xs text-blue-600 hover:bg-gray-50 flex items-center gap-2 font-medium">
                        💰 Initiate Refund
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Info & Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600">
        <div className="flex flex-wrap gap-1">
          <span>📦 {returns.length} returned orders in October 2025</span>
          <span className="hidden sm:inline">•</span>
          <span>Total Refund Value: ₹{totalRefundValue.toLocaleString('en-IN')}</span>
          <span className="hidden sm:inline">•</span>
          <span>Average Refund Time: 2.4 days</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        <span className="text-sm text-gray-500">Showing 1-{Math.min(10, returns.length)} of {returns.length} returned orders</span>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-gray-200 rounded text-gray-600 hover:bg-gray-50 disabled:opacity-50 text-sm" disabled>Prev</button>
          <button className="px-4 py-2 border border-gray-200 rounded text-gray-600 hover:bg-gray-50 text-sm">Next</button>
        </div>
      </div>
    </div>
  )
}

function StatusBadge({ status }) {
  let styles = ''
  switch (status) {
    case 'Refund Pending':
      styles = 'bg-red-50 text-red-600 border border-red-200'
      break
    case 'Refund Initiated':
      styles = 'bg-purple-50 text-purple-600 border border-purple-200'
      break
    case 'Refund Completed':
      styles = 'bg-green-50 text-green-600 border border-green-200'
      break
    default:
      styles = 'bg-gray-50 text-gray-600 border border-gray-200'
  }

  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${styles}`}>
      {status}
    </span>
  )
}
