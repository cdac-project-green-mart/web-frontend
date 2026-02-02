import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getOrderById } from "../api/orderApi";
import { isLoggedIn } from "../utils/cartUtils";
import OrderAddressesCard from "../components/orders/OrderAddressCard";
import OrderSummaryCard from "../components/orders/OrderSummaryCard";
import OrderStatusTracker from "../components/orders/OrderStatusTracker";
import OrderProductsTable from "../components/orders/OrderProductsTable";

const statusToStep = {
  PENDING: 1,
  CONFIRMED: 2,
  SHIPPED: 3,
  DELIVERED: 4,
  CANCELLED: 0,
  PAYMENT_FAILED: 0,
};

// Format order ID for display (e.g. #4152)
const formatOrderId = (id) => {
  if (!id) return "#----";
  const str = String(id);
  const last4 = str.replace(/-/g, "").slice(-4);
  const num = parseInt(last4, 16) % 10000;
  return `#${num.toString().padStart(4, "0")}`;
};

// Format date as "April 24, 2021"
const formatDate = (dateStr) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export default function OrderDetails() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isLoggedIn() || !orderId) return;

    const userId = (() => {
      try {
        const u = JSON.parse(localStorage.getItem("user") || "{}");
        return u.email || u.id || "";
      } catch {
        return "";
      }
    })();

    if (!userId) {
      setLoading(false);
      return;
    }

    getOrderById(orderId, userId)
      .then((data) => setOrder(data))
      .catch((err) =>
        setError(
          err.response?.data?.message || err.message || "Failed to load order"
        )
      )
      .finally(() => setLoading(false));
  }, [orderId]);

  if (!isLoggedIn()) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-gray-600 mb-4">Please log in to view order details.</p>
        <Link to="/login" className="text-green-600 hover:underline">
          Login
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading order…</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-red-600 mb-4">{error || "Order not found"}</p>
        <Link to="/orders" className="text-green-600 hover:underline">
          Back to Order History
        </Link>
      </div>
    );
  }

  const productsCount = order.items?.length ?? 0;
  const subtotal = order.items?.reduce(
    (s, i) => s + Number(i.price || 0) * (i.quantity || 0),
    0
  );
  const totalAmount = Number(order.totalAmount ?? subtotal);
  const discountPercent = subtotal > 0
    ? Math.max(0, Math.round(((subtotal - totalAmount) / subtotal) * 100))
    : 0;
  const statusStep = Math.max(1, statusToStep[order.status] ?? 1);

  const addr = order.shippingAddress;
  const customer = addr
    ? {
        name: addr.name ?? "",
        addressLine1: [addr.street, addr.city, addr.zip]
          .filter(Boolean)
          .join(", ") || "—",
        email: addr.email ?? order.userId ?? "",
        phone: addr.phone ?? "—",
      }
    : {
        name: "",
        addressLine1: "—",
        email: order.userId ?? "",
        phone: "—",
      };

  const products = (order.items || []).map((i) => ({
    id: i.productId ?? i.id,
    name: i.name ?? "Product",
    price: Number(i.price ?? 0),
    quantity: i.quantity ?? 0,
    image: i.image ?? "/placeholder.jpg",
  }));

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold">Order Details</h1>
            <p className="text-gray-500 text-sm mt-1">
              • {formatDate(order.createdAt)} • {productsCount} Product
              {productsCount !== 1 ? "s" : ""}
            </p>
          </div>
          <Link
            to="/orders"
            className="inline-flex items-center justify-center px-5 py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
          >
            Back to List
          </Link>
        </div>

        {/* Addresses + Order Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
          <div className="lg:col-span-2">
            <OrderAddressesCard customer={customer} />
          </div>
          <div>
            <OrderSummaryCard
              id={formatOrderId(order.id)}
              paymentMethod={
                order.paymentMethod === "razorpay"
                  ? "Paypal"
                  : order.paymentMethod ?? "Paypal"
              }
              subtotal={subtotal}
              discountPercent={discountPercent}
              shippingLabel="Free"
              total={totalAmount}
            />
          </div>
        </div>

        {/* Order Status Tracker */}
        <div className="mb-8">
          <OrderStatusTracker statusStep={statusStep} />
        </div>

        {/* Product List */}
        <OrderProductsTable products={products} />
      </div>
    </div>
  );
}
