import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCartItems, getCartTotalItems, isLoggedIn, logout } from "../utils/cartUtils";

export default function Account() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [cartSummary, setCartSummary] = useState({ items: 0, total: 0 });

  useEffect(() => {
    // Check if user is logged in
    if (!isLoggedIn()) {
      navigate("/login", { state: { from: "/account" }, replace: true });
      return;
    }

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user data", e);
      }
    }

    // Get cart summary
    const cart = getCartItems();
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setCartSummary({
      items: getCartTotalItems(),
      total: total,
    });

    // Listen for cart updates
    const handleCartUpdate = () => {
      const updatedCart = getCartItems();
      const updatedTotal = updatedCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      setCartSummary({
        items: getCartTotalItems(),
        total: updatedTotal,
      });
    };

    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => window.removeEventListener("cartUpdated", handleCartUpdate);
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  if (!user) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Loading account...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">My Account</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* User Profile Card */}
          <div className="md:col-span-2 bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500">Name</label>
                <p className="text-lg font-medium">{user.name || "Not set"}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Email</label>
                <p className="text-lg font-medium">{user.email}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Role</label>
                <p className="text-lg font-medium capitalize">{user.role?.toLowerCase() || "Customer"}</p>
              </div>
            </div>
          </div>

          {/* Cart Summary Card */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-xl font-semibold mb-4">Cart Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Items in cart:</span>
                <span className="font-medium">{cartSummary.items}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total:</span>
                <span className="font-medium text-green-600">₹{cartSummary.total.toFixed(2)}</span>
              </div>
              <Link
                to="/cart"
                className="block w-full mt-4 text-center bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
              >
                View Cart
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <Link
            to="/orders"
            className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Order History</h3>
                <p className="text-sm text-gray-500">View your past orders</p>
              </div>
            </div>
          </Link>

          <Link
            to="/cart"
            className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Shopping Cart</h3>
                <p className="text-sm text-gray-500">{cartSummary.items} items in cart</p>
              </div>
            </div>
          </Link>

          <Link
            to="/products"
            className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Continue Shopping</h3>
                <p className="text-sm text-gray-500">Browse products</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Logout Button */}
        <div className="mt-8">
          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
