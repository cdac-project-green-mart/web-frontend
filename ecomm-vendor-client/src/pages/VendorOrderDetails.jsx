import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function VendorOrderDetails() {
  const { id } = useParams();

  // Mock data based on the image
  const order = {
    id: id || "ORD-10293",
    status: "Unshipped",
    customer: {
      name: "Rohan Sharma",
      email: "rohan@example.com",
      phone: "+91 9876543210",
      billingAddress: "123 Park Street, Delhi, India",
      shippingAddress: "Plot 24, Sector 14, Gurugram, India",
      paymentMethod: "6B7280"
    },
    items: [
      {
        name: "Blue T-Shirt",
        id: "BLU-TS-001",
        quantity: 1,
        price: 499,
        total: 499,
        image: null // Placeholder
      }
    ],
    timeline: [
      { status: "Order Received", date: "05 Oct 2025", active: true },
      { status: "Payment Confirmed", date: "05 Oct 2025", active: true },
      { status: "Awaiting Shipment", date: "Current", active: true, current: true }
    ]
  };

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

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 font-sans text-gray-800">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Header Breadcrumbs & Title */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="text-sm text-gray-500 mb-1">
              <Link to="/vendor/orders" className="hover:text-green-600">Orders</Link> › {order.id} › Details
            </div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold text-gray-800">
                Order Details — #{order.id}
              </h1>
              <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded border border-yellow-200 font-medium">
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

        {/* Customer Details */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <h2 className="text-base font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-2">
            Customer Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-sm">
            <div className="flex">
              <span className="w-32 text-gray-500">Buyer Name:</span>
              <span className="text-blue-600 font-medium">{order.customer.name}</span>
            </div>
            <div className="flex">
              <span className="w-40 text-gray-500">Payment Method:</span>
              <span className="text-gray-900 font-medium">{order.customer.paymentMethod}</span>
            </div>
            <div className="flex">
              <span className="w-32 text-gray-500">Email:</span>
              <span className="text-gray-600">{order.customer.email}</span>
            </div>
            <div className="flex">
              {/* Spacer or extra fields */}
            </div>
            <div className="flex">
              <span className="w-32 text-gray-500">Phone:</span>
              <span className="text-gray-600">{order.customer.phone}</span>
            </div>
            <div className="col-span-1 md:col-span-2 mt-2"></div>
            <div className="flex col-span-1 md:col-span-2">
              <span className="w-32 text-gray-500 flex-shrink-0">Billing Address:</span>
              <span className="text-gray-600">{order.customer.billingAddress}</span>
            </div>
            <div className="flex col-span-1 md:col-span-2">
              <span className="w-32 text-gray-500 flex-shrink-0">Shipping Address:</span>
              <span className="text-gray-600">{order.customer.shippingAddress}</span>
            </div>
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
                {order.items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-100 rounded border border-gray-200"></div>
                        <span className="text-gray-700 font-medium">{item.name}</span>
                      </div>
                    </td>
                    <td className="py-4 text-gray-500">{item.id}</td>
                    <td className="py-4 text-center text-gray-700">{item.quantity}</td>
                    <td className="py-4 text-right text-gray-700">₹{item.price}</td>
                    <td className="py-4 text-right text-gray-700 font-medium">₹{item.total}</td>
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

            {order.timeline.map((event, idx) => (
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

      </div>
    </div>
  );
}
