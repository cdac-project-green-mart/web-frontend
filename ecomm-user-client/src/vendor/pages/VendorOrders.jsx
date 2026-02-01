import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

const DATA = {
  unshipped: [
    {
      id: 'ORD-10293',
      product: 'Blue T-Shirt',
      dateReceived: '05 Oct 2025',
      amount: 499,
      status: 'Pending',
    },
    {
      id: 'ORD-10294',
      product: 'Coffee Mug',
      dateReceived: '05 Oct 2025',
      amount: 299,
      status: 'Pending',
    },
  ],
  shipped: [
    {
      id: 'ORD-10290',
      product: 'Blue T-Shirt',
      dateReceived: '03 Oct 2025',
      dateShipped: '04 Oct 2025',
      amount: 499,
      status: 'Shipped',
    },
    {
      id: 'ORD-10291',
      product: 'Coffee Mug',
      dateReceived: '03 Oct 2025',
      dateShipped: '04 Oct 2025',
      amount: 299,
      status: 'Shipped',
    },
    {
      id: 'ORD-10292',
      product: 'Notebook',
      dateReceived: '03 Oct 2025',
      dateShipped: '05 Oct 2025',
      amount: 149,
      status: 'Shipped',
    },
  ],
}

export default function VendorOrders() {
  const [activeTab, setActiveTab] = useState('unshipped')
  const [selectedOrders, setSelectedOrders] = useState([])
  const [bulkAction, setBulkAction] = useState('')
  const [openMenuId, setOpenMenuId] = useState(null)

  /** 🔑 Single source of truth */
  const orders = DATA[activeTab]

  const allSelected =
    orders.length > 0 &&
    selectedOrders.length === orders.length

  const totalValue = useMemo(
    () => orders.reduce((sum, o) => sum + o.amount, 0),
    [orders]
  )

  const switchTab = (tab) => {
    setActiveTab(tab)
    setSelectedOrders([])
    setBulkAction('')
    setOpenMenuId(null)
  }

  const toggleSelectAll = () => {
    setSelectedOrders(
      allSelected ? [] : orders.map((o) => o.id)
    )
  }

  const toggleSelectOne = (id) => {
    setSelectedOrders((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    )
  }

  const applyBulkAction = () => {
    if (!bulkAction || selectedOrders.length === 0) return

    console.log(
      `[${activeTab}] applying "${bulkAction}" to`,
      selectedOrders
    )

    setSelectedOrders([])
    setBulkAction('')
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold text-gray-800">
        Orders
      </h1>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => switchTab('unshipped')}
          className={`px-4 py-2 text-sm border ${activeTab === 'unshipped'
            ? 'bg-gray-900 text-white'
            : 'bg-gray-100 text-gray-600'
            }`}
        >
          Unshipped Orders
        </button>

        <button
          onClick={() => switchTab('shipped')}
          className={`px-4 py-2 text-sm border ${activeTab === 'shipped'
            ? 'bg-gray-900 text-white'
            : 'bg-gray-100 text-gray-600'
            }`}
        >
          Shipped Orders
        </button>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <input
          className="border border-gray-200 rounded px-3 py-2 text-sm w-[420px]"
          placeholder="Search by Order ID, Product Name, Buyer Name, or Tracking ID"
        />

        <select
          className="border border-gray-200 rounded px-4 py-2 text-sm bg-white w-40"
          value={bulkAction}
          onChange={(e) => setBulkAction(e.target.value)}
        >
          <option value="">Bulk Actions</option>
          {activeTab === 'unshipped' && (
            <>
              <option value="ship">Ship Orders</option>
              <option value="cancel">Cancel Orders</option>
            </>
          )}
          {activeTab === 'shipped' && (
            <>
              <option value="export">Export</option>
              <option value="invoice">Download Invoice</option>
            </>
          )}
        </select>

        <button
          onClick={applyBulkAction}
          className="border border-gray-200 rounded px-4 py-2 text-sm bg-white"
        >
          Apply
        </button>

        <span className="ml-auto text-sm text-gray-600">
          📦 Total Orders: {orders.length}
        </span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <table className="w-full text-sm text-left">
          <thead className="border-b border-gray-200 text-gray-500">
            <tr>
              <th className="p-3 w-8">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleSelectAll}
                />
              </th>
              <th className="p-3">Product</th>
              <th className="p-3">Order ID</th>
              <th className="p-3">Date Received</th>
              {activeTab === 'shipped' && (
                <th className="p-3">Date Shipped</th>
              )}
              <th className="p-3">Amount</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-t border-gray-100"
              >
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selectedOrders.includes(order.id)}
                    onChange={() =>
                      toggleSelectOne(order.id)
                    }
                  />
                </td>

                <td className="p-3">{order.product}</td>
                <td className="p-3 text-blue-600">
                  <Link to={`/vendor/order-details/${order.id}`} className="hover:underline">
                    #{order.id}
                  </Link>
                </td>
                <td className="p-3">
                  {order.dateReceived}
                </td>

                {activeTab === 'shipped' && (
                  <td className="p-3">
                    {order.dateShipped}
                  </td>
                )}

                <td className="p-3">
                  ₹{order.amount}
                </td>
                <td className="p-3 text-gray-600">
                  {order.status}
                </td>

                <td className="p-3 relative">
                  <button
                    onClick={() =>
                      setOpenMenuId(
                        openMenuId === order.id
                          ? null
                          : order.id
                      )
                    }
                    className="px-2 py-1 border border-gray-200 rounded text-gray-500 hover:bg-gray-50"
                  >
                    ⋮
                  </button>

                  {openMenuId === order.id && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-sm z-10">
                      {activeTab === 'unshipped' && (
                        <>
                          <button className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-50">
                            Ship Order
                          </button>
                          <button className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-50">
                            Cancel Order
                          </button>
                        </>
                      )}
                      {activeTab === 'shipped' && (
                        <>
                          <Link
                            to={`/vendor/order-details/${order.id}`}
                            className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
                          >
                            View Details
                          </Link>
                          <button className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-50">
                            Download Invoice
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Shipped summary only */}
      {activeTab === 'shipped' && (
        <div className="text-sm text-gray-600">
          📦 {orders.length} shipped orders in October 2025 •
          Total Value: ₹
          {totalValue.toLocaleString('en-IN')}
        </div>
      )}
    </div>
  )
}
