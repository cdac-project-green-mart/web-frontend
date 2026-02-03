import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getOrders } from "../api/orderApi";
import { isLoggedIn } from "../utils/cartUtils";

// Format order ID for display (e.g. #4152)
const formatOrderId = (id) => {
  if (!id) return "#----";
  const str = String(id);
  const last4 = str.replace(/-/g, "").slice(-4);
  const num = parseInt(last4, 16) % 10000;
  return `#${num.toString().padStart(4, "0")}`;
};

// Format date as "4 April, 2021" (short month for list)
const formatDate = (dateStr) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const statusDisplay = {
  PENDING: "Pending",
  CONFIRMED: "Processing",
  SHIPPED: "on the way",
  DELIVERED: "Completed",
  CANCELLED: "Cancelled",
  PAYMENT_FAILED: "Payment Failed",
};

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isLoggedIn()) {
      setLoading(false);
      return;
    }

    getOrders()
      .then((data) => setOrders(Array.isArray(data) ? data : []))
      .catch((err) =>
        setError(
          err.response?.data?.message || err.message || "Failed to load orders"
        )
      )
      .finally(() => setLoading(false));
  }, []);

  if (!isLoggedIn()) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <p className="text-gray-600 mb-4">Please log in to view your orders.</p>
        <Link to="/login" className="text-green-600 hover:underline font-medium">
          Login
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Loading order history…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <p className="text-red-600 mb-4">{error}</p>
        <Link to="/" className="text-green-600 hover:underline">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Order History</h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-12 text-center">
            <p className="text-gray-500 mb-4">You have no orders yet.</p>
            <Link
              to="/products"
              className="inline-flex items-center justify-center px-5 py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
            >
              Shop Now
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    <th className="px-6 py-4">ORDER ID</th>
                    <th className="px-6 py-4">DATE</th>
                    <th className="px-6 py-4">TOTAL</th>
                    <th className="px-6 py-4">STATUS</th>
                    <th className="px-6 py-4 text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => {
                    const itemCount = order.items?.length ?? 0;
                    const total = Number(order.totalAmount ?? 0);
                    const status =
                      statusDisplay[order.status] ?? order.status ?? "Pending";
                    return (
                      <tr
                        key={order.id}
                        className="border-b border-gray-100 hover:bg-gray-50/50"
                      >
                        <td className="px-6 py-4 font-medium text-gray-900">
                          {formatOrderId(order.id)}
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {formatDate(order.createdAt)}
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          ₹{total.toFixed(2)}{" "}
                          <span className="text-gray-500 text-sm">
                            ({itemCount} Product{itemCount !== 1 ? "s" : ""})
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                              order.status === "DELIVERED"
                                ? "bg-green-100 text-green-800"
                                : order.status === "CANCELLED" ||
                                    order.status === "PAYMENT_FAILED"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Link
                            to={`/orders/${order.id}`}
                            className="text-green-600 hover:text-green-700 font-medium"
                          >
                            View Details
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
