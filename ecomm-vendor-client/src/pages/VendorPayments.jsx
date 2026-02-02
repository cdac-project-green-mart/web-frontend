import { useState } from 'react'
import { Link } from 'react-router-dom'

const MOCK_PAYMENTS = [
  {
    id: 1,
    orderId: '#ORD-10270',
    date: '03 Oct 2025',
    txnId: 'TXN-982134',
    type: 'Payment Received',
    amount: 999,
    shipCharge: -50,
    platFee: -80,
    returnFee: 0,
    tax: -20,
    finalPayout: 849,
  },
  {
    id: 2,
    orderId: '#ORD-10271',
    date: '04 Oct 2025',
    txnId: 'TXN-982200',
    type: 'Refund Processed',
    amount: -999,
    shipCharge: 0,
    platFee: 0,
    returnFee: -40,
    tax: 0,
    finalPayout: -849, // Adjusted logic: Refund usually deducts money
  },
  {
    id: 3,
    orderId: '#ORD-10272',
    date: '05 Oct 2025',
    txnId: 'TXN-982289',
    type: 'Payment Received',
    amount: 499,
    shipCharge: -40,
    platFee: -20,
    returnFee: 0,
    tax: -10,
    finalPayout: 429,
  },
  // Extra rows for UI fullness
  {
    id: 4,
    orderId: '#ORD-10275',
    date: '06 Oct 2025',
    txnId: 'TXN-982301',
    type: 'Payment Received',
    amount: 1299,
    shipCharge: -60,
    platFee: -100,
    returnFee: 0,
    tax: -30,
    finalPayout: 1109,
  },
  {
    id: 5,
    orderId: '#ORD-10276',
    date: '07 Oct 2025',
    txnId: 'TXN-982355',
    type: 'Payment Received',
    amount: 799,
    shipCharge: -40,
    platFee: -60,
    returnFee: 0,
    tax: -15,
    finalPayout: 684,
  },
]

export default function VendorPayments() {
  const [payments, setPayments] = useState(MOCK_PAYMENTS)
  const [selectedIds, setSelectedIds] = useState(new Set())
  const [searchQuery, setSearchQuery] = useState('')

  // Stats Data
  const stats = {
    totalPaid: 215000,
    pending: 35000,
    refunds: 15000,
    netEarnings: 200000,
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
        <StatCard title="Pending Payments" value={stats.pending} icon="🕑" />
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
              {payments.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="p-4 align-middle">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 cursor-pointer"
                      checked={selectedIds.has(p.id)}
                      onChange={() => handleSelectOne(p.id)}
                    />
                  </td>
                  <td className="p-4 align-middle text-gray-500 font-medium">
                    <Link to={`/order-details/${p.orderId.replace('#', '')}`} className="text-blue-500 hover:underline">
                      {p.orderId}
                    </Link>
                  </td>
                  <td className="p-4 align-middle text-gray-500">{p.date}</td>
                  <td className="p-4 align-middle text-gray-500">{p.txnId}</td>
                  <td className="p-4 align-middle">
                    <span
                      className={`px-2 py-1 rounded border text-xs font-medium ${p.type === 'Payment Received'
                        ? 'bg-green-50 text-green-600 border-green-200'
                        : 'bg-red-50 text-red-600 border-red-200'
                        }`}
                    >
                      {p.type}
                    </span>
                  </td>
                  <td className="p-4 align-middle text-gray-600">₹{p.amount}</td>
                  <td className="p-4 align-middle text-gray-600">₹{p.shipCharge}</td>
                  <td className="p-4 align-middle text-gray-600">₹{p.platFee}</td>
                  <td className="p-4 align-middle text-gray-600">₹{p.returnFee}</td>
                  <td className="p-4 align-middle text-gray-600">₹{p.tax}</td>
                  <td className="p-4 align-middle font-semibold text-gray-700">₹{p.finalPayout}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer / Summary */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
        <div className="flex flex-wrap gap-1 items-center">
          <span>📊 {payments.length} payments in October 2025</span>
          <span className="hidden sm:inline">•</span>
          <span>Total Paid ₹{stats.totalPaid.toLocaleString('en-IN')}</span>
          <span className="hidden sm:inline">•</span>
          <span>Refunds ₹{stats.refunds.toLocaleString('en-IN')}</span>
          <span className="hidden sm:inline">•</span>
          <span>Net Earnings ₹{stats.netEarnings.toLocaleString('en-IN')}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-0">
        <span className="text-sm text-gray-500">Showing 1-{Math.min(10, payments.length)} of 25 payments</span>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 border border-gray-200 rounded text-gray-600 hover:bg-gray-50 disabled:opacity-50 text-sm" disabled>Prev</button>
          <button className="px-3 py-1.5 border border-gray-200 rounded text-gray-600 hover:bg-gray-50 text-sm">Next</button>
        </div>
      </div>
    </div>
  )
}

function StatCard({ title, value, icon, highlight }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5 flex flex-col justify-between h-full">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm">{icon}</span>
        <span className="text-sm text-gray-500 font-medium">{title}</span>
      </div>
      <div className="text-2xl font-semibold text-gray-800">
        ₹{value.toLocaleString('en-IN')}
      </div>
    </div>
  )
}
