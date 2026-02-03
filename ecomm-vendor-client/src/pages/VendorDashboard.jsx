import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getVendorOrders } from '../api/orders'
import { getVendorProducts } from '../api/products'
import { getPaymentHistory } from '../api/payments'
import { getInventory } from '../api/inventory'

export default function VendorDashboard() {
  const [stats, setStats] = useState(null)
  const [salesData, setSalesData] = useState(null)
  const [recentOrders, setRecentOrders] = useState([])
  const [topProducts, setTopProducts] = useState([])
  const [alerts, setAlerts] = useState([])
  const [salesPeriod, setSalesPeriod] = useState('7d')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true)
      try {
        // Fetch all data in parallel
        const [orders, products, payments] = await Promise.all([
          getVendorOrders().catch(() => []),
          getVendorProducts().catch(() => []),
          getPaymentHistory().catch(() => [])
        ])

        // Calculate stats from real data
        const totalOrders = orders.length
        const completedPayments = payments.filter(p => p.status === 'COMPLETED')
        const refundedPayments = payments.filter(p => p.status === 'REFUNDED')
        const totalEarnings = completedPayments.reduce((sum, p) => sum + Number(p.amount || 0), 0)
        const pendingShipments = orders.filter(o => o.status === 'PENDING' || o.status === 'CONFIRMED').length
        const returnRate = totalOrders > 0 ? ((refundedPayments.length / totalOrders) * 100).toFixed(1) : 0

        setStats({
          totalOrders,
          totalEarnings,
          pendingShipments,
          returnRate: Number(returnRate)
        })

        // Calculate total revenue
        setSalesData({
          totalRevenue: totalEarnings
        })

        // Recent orders (last 5)
        const sortedOrders = [...orders].sort((a, b) =>
          new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
        ).slice(0, 5)

        setRecentOrders(sortedOrders.map(o => ({
          orderId: o.id || o.orderId,
          product: o.items?.[0]?.name || 'Order',
          customer: o.customerName || o.userId?.slice(0, 8) || 'Customer',
          date: o.createdAt ? new Date(o.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }) : '—',
          amount: Number(o.totalAmount || o.amount || 0)
        })))

        // Top products (just show products, we don't have sales data per product)
        const productsWithStock = await Promise.all(
          products.slice(0, 5).map(async (p) => {
            const id = p._id || p.id
            let quantity = 0
            try {
              const inv = await getInventory(id)
              quantity = inv?.quantity ?? inv?.stock ?? 0
            } catch {
              quantity = 0
            }
            return {
              product: p.name,
              units: quantity,
              revenue: Number(p.price || 0) * quantity
            }
          })
        )
        setTopProducts(productsWithStock)

        // Generate dynamic alerts
        const dynamicAlerts = []

        // Check for low stock products
        const lowStockCount = productsWithStock.filter(p => p.units > 0 && p.units < 10).length
        if (lowStockCount > 0) {
          dynamicAlerts.push({ id: 1, message: `${lowStockCount} product(s) low on stock` })
        }

        // Check for pending orders
        if (pendingShipments > 0) {
          dynamicAlerts.push({ id: 2, message: `${pendingShipments} order(s) pending shipment` })
        }

        // Check for refunds
        if (refundedPayments.length > 0) {
          dynamicAlerts.push({ id: 3, message: `${refundedPayments.length} refund(s) processed` })
        }

        if (dynamicAlerts.length === 0) {
          dynamicAlerts.push({ id: 4, message: 'No alerts at this time' })
        }

        setAlerts(dynamicAlerts)
      } catch (error) {
        console.error('Dashboard error:', error)
        setStats({ totalOrders: 0, totalEarnings: 0, pendingShipments: 0, returnRate: 0 })
        setSalesData({ totalRevenue: 0 })
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
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
          <Link to="/orders" className="text-sm text-gray-500 hover:text-gray-700">
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
                  <Link to={`/order-details/${order.orderId}`} className="text-blue-600 hover:text-blue-800 hover:underline">
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
          <Link to="/inventory" className="text-sm text-gray-500 hover:text-gray-700">
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
