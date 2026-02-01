import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// Mock Data
const mockDashboardStats = {
  totalOrders: 45,
  totalEarnings: 28400,
  pendingShipments: 12,
  returnRate: 2.4,
}

const mockSalesData = {
  totalRevenue: 145000,
}

const mockRecentOrders = [
  { orderId: '12345', product: 'Blue T-Shirt', customer: 'Rohan S.', date: '05 Oct', amount: 499 },
  { orderId: '12346', product: 'Arjun Mug', customer: 'Arjun P.', date: '05 Oct', amount: 299 },
  { orderId: '12647', product: 'Notebook', customer: 'Neha R.', date: '06 Oct', amount: 149 },
]

const mockTopProducts = [
  { product: 'Blue T-Shirt', units: 340, revenue: 123000 },
  { product: 'Coffee Mug', units: 210, revenue: 62000 },
  { product: 'Notebook', units: 150, revenue: 28000 },
]

const mockAlerts = [
  { id: 1, message: '3 products low on stock' },
  { id: 2, message: 'Payout ₹45,000 scheduled for 10 Oct 2025' },
  { id: 3, message: '2 new returns pending review' },
]

export default function VendorDashboard() {
  const [stats, setStats] = useState(null)
  const [salesData, setSalesData] = useState(null)
  const [recentOrders, setRecentOrders] = useState([])
  const [topProducts, setTopProducts] = useState([])
  const [alerts, setAlerts] = useState([])
  const [salesPeriod, setSalesPeriod] = useState('7d')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)

    setTimeout(() => {
      setStats(mockDashboardStats)
      setSalesData(mockSalesData)
      setRecentOrders(mockRecentOrders)
      setTopProducts(mockTopProducts)
      setAlerts(mockAlerts)
      setLoading(false)
    }, 300)
  }, [salesPeriod])

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount)

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading dashboard...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Orders" value={stats.totalOrders} />
        <StatCard title="Total Earnings" value={formatCurrency(stats.totalEarnings)} />
        <StatCard title="Pending Shipments" value={stats.pendingShipments} />
        <StatCard title="Return Rate" value={`${stats.returnRate}%`} />
      </div>

      {/* Sales Overview */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Sales Overview (Last {salesPeriod === '7d' ? '7 Days' : '30 Days'})
          </h2>
          <div className="flex gap-2">
            {['7d', '30d', 'custom'].map((p) => (
              <button
                key={p}
                onClick={() => setSalesPeriod(p)}
                className={`px-3 py-1 rounded text-sm ${salesPeriod === p
                  ? 'bg-gray-800 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                {p.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="h-48 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center mb-4">
          <span className="text-gray-400">[ SALES GRAPH ]</span>
        </div>

        <div className="text-sm text-gray-600">
          Total Revenue:{' '}
          <span className="font-semibold">{formatCurrency(salesData.totalRevenue)}</span>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Recent Orders</h2>
          <Link to="/vendor/orders" className="text-sm text-gray-500 hover:text-gray-700">
            View All
          </Link>
        </div>
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500">
              <th className="pb-3 font-medium">Order ID</th>
              <th className="pb-3 font-medium">Product</th>
              <th className="pb-3 font-medium">Customer</th>
              <th className="pb-3 font-medium">Date</th>
              <th className="pb-3 font-medium text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {recentOrders.map((order) => (
              <tr key={order.orderId} className="border-t border-gray-100">
                <td className="py-3 text-gray-700">
                  <Link to={`/vendor/order-details/${order.orderId}`} className="text-blue-600 hover:text-blue-800 hover:underline">
                    {order.orderId}
                  </Link>
                </td>
                <td className="py-3 text-gray-700">{order.product}</td>
                <td className="py-3 text-gray-700">{order.customer}</td>
                <td className="py-3 text-gray-700">{order.date}</td>
                <td className="py-3 text-gray-700 text-right">
                  {formatCurrency(order.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Top Products */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Top Products</h2>
          <Link to="/vendor/inventory" className="text-sm text-gray-500 hover:text-gray-700">
            View Inventory
          </Link>
        </div>
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500">
              <th className="pb-3 font-medium">Product</th>
              <th className="pb-3 font-medium">Units</th>
              <th className="pb-3 font-medium text-right">Revenue</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {topProducts.map((product) => (
              <tr key={product.product} className="border-t border-gray-100">
                <td className="py-3 text-gray-700">{product.product}</td>
                <td className="py-3 text-gray-700">{product.units}</td>
                <td className="py-3 text-gray-700 text-right">
                  {formatCurrency(product.revenue)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Alerts */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Alerts & Notifications</h2>
        <ul className="space-y-2">
          {alerts.map((alert) => (
            <li key={alert.id} className="flex items-start gap-2 text-sm text-gray-700">
              <span className="text-gray-400">•</span>
              {alert.message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="text-sm text-gray-500 mb-1">{title}</div>
      <div className="text-2xl font-semibold text-gray-800">{value}</div>
    </div>
  )
}
