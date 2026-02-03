import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getVendorOrderById } from "../api/orders";

/**
 * Vendor order detail view.
 * Fetches real order data from the backend API.
 */
export default function VendorOrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      setLoading(true);
      getVendorOrderById(id)
        .then((data) => {
          setOrder(data);
          setError("");
        })
        .catch((err) => setError(err.message || "Failed to load order"))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const [shippingDetails, setShippingDetails] = useState({
    weight: "",
    length: "",
    width: "",
    height: "",
    courier: "",
    slot: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails(prev => ({ ...prev, [name]: value }));
  };

  // Format status for display
  const getStatusBadge = (status) => {
    const styles = {
      PENDING: "bg-yellow-100 text-yellow-800 border-yellow-200",
      CONFIRMED: "bg-blue-100 text-blue-800 border-blue-200",
      SHIPPED: "bg-purple-100 text-purple-800 border-purple-200",
      DELIVERED: "bg-green-100 text-green-800 border-green-200",
      CANCELLED: "bg-red-100 text-red-800 border-red-200"
    };
    return styles[status] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  // Generate timeline from order status
  const getTimeline = (order) => {
    if (!order) return [];
    const statuses = ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED"];
    const currentIdx = statuses.indexOf(order.status);
    return statuses.map((status, idx) => ({
      status: status.charAt(0) + status.slice(1).toLowerCase(),
      date: idx <= currentIdx ? new Date(order.updatedAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short" }) : "—",
      active: idx <= currentIdx,
      current: idx === currentIdx
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 font-sans text-gray-800">
        <div className="max-w-6xl mx-auto">
          <p className="text-gray-500">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 font-sans text-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
            {error || "Order not found"}
          </div>
          <Link to="/orders" className="text-blue-600 hover:underline mt-4 inline-block">
            ← Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  const timeline = getTimeline(order);
  const orderId = order.id;
  const statusBadge = getStatusBadge(order.status);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 font-sans text-gray-800">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Header Breadcrumbs & Title */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="text-sm text-gray-500 mb-1">
              <Link to="/orders" className="hover:text-green-600">Orders</Link> › {orderId.slice(0, 8)}... › Details
            </div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold text-gray-800">
                Order Details — #{orderId.slice(0, 8)}...
              </h1>
              <span className={`text-xs px-2 py-1 rounded border font-medium ${statusBadge}`}>
                {order.status}
              </span>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-gray-100 border border-gray-300 text-gray-700 rounded text-sm font-medium hover:bg-gray-200 transition">
              Download Invoice
            </button>
            <button className="px-4 py-2 bg-gray-900 text-white rounded text-sm font-medium hover:bg-gray-800 transition">
              Initiate Refund
            </button>
          </div>
        </div>

        {/* Customer & Shipping Details */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <h2 className="text-base font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-2">
            Order & Shipping Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-sm">
            <div className="flex">
              <span className="w-32 text-gray-500">Customer ID:</span>
              <span className="text-blue-600 font-medium">{order.userId?.slice(0, 8)}...</span>
            </div>
            <div className="flex">
              <span className="w-40 text-gray-500">Total Amount:</span>
              <span className="text-gray-900 font-medium">₹{order.totalAmount}</span>
            </div>
            <div className="flex">
              <span className="w-32 text-gray-500">Order Date:</span>
              <span className="text-gray-600">{new Date(order.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
            </div>
            <div className="flex">
              <span className="w-40 text-gray-500">Last Updated:</span>
              <span className="text-gray-600">{new Date(order.updatedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
            </div>
            {order.shippingAddress && (
              <div className="flex col-span-1 md:col-span-2 mt-2">
                <span className="w-32 text-gray-500 flex-shrink-0">Shipping Address:</span>
                <span className="text-gray-600">
                  {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.zip}, {order.shippingAddress.country}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Product Info</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-gray-100 text-gray-500">
                  <th className="pb-3 font-medium">Product</th>
                  <th className="pb-3 font-medium">Product ID</th>
                  <th className="pb-3 font-medium text-center">Quantity</th>
                  <th className="pb-3 font-medium text-right">Price</th>
                  <th className="pb-3 font-medium text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {order.items?.map((item, idx) => (
                  <tr key={idx}>
                    <td className="py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-100 rounded border border-gray-200 flex items-center justify-center text-gray-400 text-xs">IMG</div>
                        <span className="text-gray-700 font-medium">{item.name || 'Product'}</span>
                      </div>
                    </td>
                    <td className="py-4 text-gray-500">{item.productId?.slice(0, 8) || '—'}...</td>
                    <td className="py-4 text-center text-gray-700">{item.quantity}</td>
                    <td className="py-4 text-right text-gray-700">₹{item.price}</td>
                    <td className="py-4 text-right text-gray-700 font-medium">₹{(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Shipping Information */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Shipping Information</h2>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-gray-100 pb-6">
            <div className="space-y-2 text-sm">
              <div className="flex gap-2">
                <span className="text-gray-500">Tracking ID:</span>
                <span className="text-gray-400">—</span>
              </div>
              <div className="flex gap-2">
                <span className="text-gray-500">Courier:</span>
                <span className="text-gray-400">—</span>
              </div>
              <div className="flex gap-2">
                <span className="text-gray-500">Package Details:</span>
                <span className="text-gray-400">—</span>
              </div>
            </div>
            <button className="px-5 py-2 bg-gray-900 text-white text-sm font-medium rounded hover:bg-gray-800 transition">
              Schedule Shipping
            </button>
          </div>

          {/* Action Panel for Scheduling */}
          <div className="bg-gray-50/50 p-4 rounded-lg border border-gray-100">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Weight (kg)</label>
                <input
                  type="text"
                  name="weight"
                  value={shippingDetails.weight}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Length (cm)</label>
                <input
                  type="text"
                  name="length"
                  value={shippingDetails.length}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Width (cm)</label>
                <input
                  type="text"
                  name="width"
                  value={shippingDetails.width}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Height (cm)</label>
                <input
                  type="text"
                  name="height"
                  value={shippingDetails.height}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                />
              </div>

              {/* Empty col for spacing on large screens or keep flowing */}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Courier</label>
                <select
                  name="courier"
                  value={shippingDetails.courier}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 bg-white"
                >
                  <option value="">▼ Choose Courier</option>
                  <option value="FedEx">FedEx</option>
                  <option value="DHL">DHL</option>
                  <option value="BlueDart">BlueDart</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Time Slot</label>
                <select
                  name="slot"
                  value={shippingDetails.slot}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 bg-white"
                >
                  <option value="">▼ Select Slot</option>
                  <option value="Morning">Morning (9am - 12pm)</option>
                  <option value="Afternoon">Afternoon (1pm - 5pm)</option>
                </select>
              </div>
              <div>
                <button className="w-full py-2 bg-gray-900 text-white rounded text-sm font-medium hover:bg-gray-800 transition">
                  Confirm & Generate
                </button>
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="flex gap-4 mt-4 pt-4 border-t border-gray-200">
              <button className="flex-1 py-2 bg-gray-200 text-gray-600 rounded text-sm font-medium hover:bg-gray-300 transition">
                Download Invoice
              </button>
              <button className="flex-1 py-2 bg-gray-200 text-gray-600 rounded text-sm font-medium hover:bg-gray-300 transition">
                Initiate Refund
              </button>
            </div>
          </div>
        </div>

        {/* Order Timeline */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <h2 className="text-base font-semibold text-gray-900 mb-6">Order Timeline</h2>
          <div className="relative pl-2">
            {/* Vertical Line */}
            <div className="absolute left-1.5 top-2 bottom-2 w-0.5 bg-gray-200"></div>

            {timeline.map((event, idx) => (
              <div key={idx} className="relative pl-8 pb-6 last:pb-0">
                {/* Dot */}
                <div className={`absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-white shadow-sm z-10 
                        ${event.current ? 'bg-yellow-400' : (event.active ? 'bg-green-500' : 'bg-gray-300')}
                     `}></div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                  <span className="text-sm font-medium text-gray-700">{event.status}</span>
                  <span className="hidden sm:inline text-gray-400">—</span>
                  <span className="text-sm text-gray-500">{event.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div >
    </div >
  );
}
