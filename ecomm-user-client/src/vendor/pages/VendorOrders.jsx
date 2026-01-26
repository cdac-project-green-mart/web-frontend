import { useState } from 'react'

const ordersData = [
  {
    id: 'ORD-10293',
    product: 'Blue T-Shirt',
    date: '05 Oct 2025',
    amount: 499,
    status: 'Pending',
  },
  {
    id: 'ORD-10294',
    product: 'Coffee Mug',
    date: '05 Oct 2025',
    amount: 299,
    status: 'Pending',
  },
  {
    id: 'ORD-10295',
    product: 'Notebook',
    date: '06 Oct 2025',
    amount: 149,
    status: 'Pending',
  },
]

export default function VendorOrders() {
  const [activeTab, setActiveTab] = useState('unshipped')
  const [openMenuId, setOpenMenuId] = useState(null)

  return (
    <div className="space-y-6">
      {/* Header */}
      <h1 className="text-xl font-semibold text-gray-800">Orders</h1>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('unshipped')}
          className={`px-4 py-2 text-sm border ${activeTab === 'unshipped'
              ? 'bg-gray-900 text-white'
              : 'bg-gray-100 text-gray-600'
            }`}
        >
          Unshipped Orders
        </button>
        <button
          onClick={() => setActiveTab('shipped')}
          className="px-4 py-2 text-sm border bg-gray-100 text-gray-600"
        >
          Shipped Orders
        </button>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <input
          className="border border-gray-200 rounded px-3 py-2 text-sm w-96"
          placeholder="Search by Order ID, Product ID, or Name"
        />
        <button className="border border-gray-200 rounded px-4 py-2 text-sm bg-white">
          Filter ▾
        </button>
        <button className="border border-gray-200 rounded px-4 py-2 text-sm bg-white">
          Bulk Actions ▾
        </button>
        <button className="border border-gray-200 rounded px-4 py-2 text-sm bg-white">
          Apply
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <table className="w-full text-sm">
          <thead className="border-b border-gray-200 text-gray-500">
            <tr>
              <th className="p-3 w-8">
                <input type="checkbox" />
              </th>
              <th className="p-3">Product</th>
              <th className="p-3">Order ID</th>
              <th className="p-3">Date Received</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {ordersData.map((order) => (
              <tr key={order.id} className="border-t border-gray-100">
                <td className="p-3">
                  <input type="checkbox" defaultChecked />
                </td>
                <td className="p-3 text-gray-700">{order.product}</td>
                <td className="p-3 text-blue-600 cursor-pointer">
                  #{order.id}
                </td>
                <td className="p-3 text-gray-700">{order.date}</td>
                <td className="p-3 text-gray-700">₹{order.amount}</td>
                <td className="p-3 text-gray-500">{order.status}</td>

                {/* Actions */}
                <td className="p-3 relative">
                  <button
                    onClick={() =>
                      setOpenMenuId(
                        openMenuId === order.id ? null : order.id
                      )
                    }
                    className="px-2 py-1 border border-gray-200 rounded text-gray-500 hover:bg-gray-50"
                  >
                    ⋮
                  </button>

                  {openMenuId === order.id && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-sm z-10">
                      <button className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-50">
                        Ship Order
                      </button>
                      <button className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-50">
                        Cancel Order
                      </button>
                      <button className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-50">
                        View Details
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">
          Showing 1–3 of 150 orders
        </span>

        <div className="flex gap-2">
          <button className="px-4 py-2 border border-gray-200 text-sm bg-gray-100">
            Prev
          </button>
          <button className="px-4 py-2 border border-gray-200 text-sm bg-gray-100">
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
