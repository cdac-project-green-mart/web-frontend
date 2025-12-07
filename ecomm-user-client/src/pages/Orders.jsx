import React from "react";

const OrderDetails = () => {
  const order = {
    id: "#4152",
    date: "April 24, 2021",
    productsCount: 3,
    paymentMethod: "Paypal",
    subtotal: 365.0,
    discountPercent: 20,
    shippingLabel: "Free",
    total: 84.0,
    statusStep: 2, // 1–4
    customer: {
      name: "Dainne Russell",
      addressLine1: "4140 Parker Rd. Allentown, New Mexico 31134",
      email: "dainne.ressell@gmail.com",
      phone: "(671) 555-0110",
    },
    products: [
      {
        id: 1,
        name: "Red Capsicum",
        price: 14.0,
        quantity: 5,
        image:
          "https://static.vecteezy.com/system/resources/previews/047/720/803/non_2x/capsicum-on-transparent-background-ai-generative-free-png.png",
      },
      {
        id: 2,
        name: "Green Capsicum",
        price: 14.0,
        quantity: 2,
        image:
          "https://cdn.metcash.media/image/upload/f_auto,c_limit,w_1500,q_auto/igashop/images/80060012",
      },
      {
        id: 3,
        name: "Green Chili",
        price: 26.7,
        quantity: 10,
        image:
          "https://static.vecteezy.com/system/resources/thumbnails/045/804/661/small_2x/several-green-chili-peppers-isolated-on-background-png.png",
      },
    ],
  };

  const steps = [
    { id: 1, label: "Order received" },
    { id: 2, label: "Processing" },
    { id: 3, label: "On the way" },
    { id: 4, label: "Delivered" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* 1️⃣ Giant container with subtle rounded corners */}
      <div className="max-w-6xl mx-auto bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-6 md:px-8 md:py-8">
        {/* Header with date inline */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap items-center gap-2 text-sm md:text-base">
              <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
                Order Details
              </h1>
              <span className="text-gray-300">•</span>
              <span className="text-gray-500">{order.date}</span>
              <span className="text-gray-300">•</span>
              <span className="text-gray-500">
                {order.productsCount} Products
              </span>
            </div>
          </div>

          <button className="text-sm font-medium text-green-600 hover:text-green-700">
            Back to List
          </button>
        </div>

        {/* Top cards: Billing/Shipping (same container) + Order summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
          {/* 3️⃣ Billing + Shipping inside one card with table-like border */}
          <div className="lg:col-span-2 bg-white border border-gray-100 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Billing */}
              <div className="p-4 md:p-5 border-b md:border-b-0 md:border-r border-gray-100">
                <h2 className="text-xs font-semibold text-gray-400 uppercase mb-3">
                  Billing Address
                </h2>
                <p className="font-semibold text-gray-900 mb-1">
                  {order.customer.name}
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  {order.customer.addressLine1}
                </p>
                <div className="text-xs text-gray-500 space-y-1">
                  <div>
                    <span className="font-semibold">Email</span>
                    <span className="block text-gray-600">
                      {order.customer.email}
                    </span>
                  </div>
                  <div className="pt-1">
                    <span className="font-semibold">Phone</span>
                    <span className="block text-gray-600">
                      {order.customer.phone}
                    </span>
                  </div>
                </div>
              </div>

              {/* Shipping */}
              <div className="p-4 md:p-5">
                <h2 className="text-xs font-semibold text-gray-400 uppercase mb-3">
                  Shipping Address
                </h2>
                <p className="font-semibold text-gray-900 mb-1">
                  {order.customer.name}
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  {order.customer.addressLine1}
                </p>
                <div className="text-xs text-gray-500 space-y-1">
                  <div>
                    <span className="font-semibold">Email</span>
                    <span className="block text-gray-600">
                      {order.customer.email}
                    </span>
                  </div>
                  <div className="pt-1">
                    <span className="font-semibold">Phone</span>
                    <span className="block text-gray-600">
                      {order.customer.phone}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order summary */}
          <div className="bg-white border border-gray-100 rounded-lg p-4 md:p-5">
            {/* 4️⃣ Order ID + Payment Method with subtle horizontal row */}
            <div className="pb-3 mb-4 border-b border-gray-100">
              <div className="flex justify-between text-xs font-semibold text-gray-400 uppercase">
                <span>Order ID:</span>
                <span>Payment Method:</span>
              </div>
              <div className="flex justify-between mt-1 text-sm font-medium text-gray-900">
                <span>{order.id}</span>
                <span>{order.paymentMethod}</span>
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-medium">
                  ${order.subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Discount:</span>
                <span>{order.discountPercent}%</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span className="text-green-600">{order.shippingLabel}</span>
              </div>
              <hr className="my-2 border-gray-100" />
              <div className="flex justify-between items-center">
                <span className="text-gray-800 font-semibold">Total</span>
                <span className="text-green-600 font-bold text-lg">
                  ${order.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Status tracker */}
        <div className="bg-white border border-gray-100 rounded-lg px-6 py-5 mb-6">
          <div className="relative flex items-center justify-between">
            {/* Line */}
            <div className="absolute left-8 right-8 top-1/2 h-1 bg-gray-100 -translate-y-1/2">
              <div
                className="h-1 bg-green-500"
                style={{
                  width: `${
                    ((order.statusStep - 1) / (steps.length - 1)) * 100
                  }%`,
                }}
              />
            </div>

            {steps.map((step) => {
              const isCompleted = step.id < order.statusStep;
              const isActive = step.id === order.statusStep;

              return (
                <div
                  key={step.id}
                  className="flex flex-col items-center z-10 w-1/4"
                >
                  <div
                    className={`w-9 h-9 flex items-center justify-center rounded-full border-2 text-sm font-semibold ${
                      isCompleted || isActive
                        ? "bg-green-500 border-green-500 text-white"
                        : "border-dashed border-green-500 text-green-500 bg-white"
                    }`}
                  >
                    {step.id.toString().padStart(2, "0")}
                  </div>
                  <span
                    className={`mt-2 text-xs ${
                      isCompleted || isActive
                        ? "text-green-600"
                        : "text-gray-400"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Products table */}
        <div className="bg-white border border-gray-100 rounded-lg overflow-hidden">
          {/* Header row */}
          <div className="grid grid-cols-4 gap-4 px-6 py-3 bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wide">
            <span>Product</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Subtotal</span>
          </div>

          {/* Rows */}
          {order.products.map((product) => (
            <div
              key={product.id}
              className="grid grid-cols-4 gap-4 px-6 py-4 border-t border-gray-100 items-center"
            >
              {/* Product */}
              <div className="flex items-center space-x-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <span className="text-sm font-medium text-gray-800">
                  {product.name}
                </span>
              </div>

              {/* 5️⃣ Price with light background */}
              <div className="text-sm text-gray-700">
                <span className="inline-block px-3 py-1 rounded-full bg-gray-50">
                  ${product.price.toFixed(2)}
                </span>
              </div>

              {/* 5️⃣ Quantity with light background */}
              <div className="text-sm text-gray-700">
                <span className="inline-block px-3 py-1 rounded-full bg-gray-50">
                  x{product.quantity}
                </span>
              </div>

              {/* Subtotal */}
              <div className="text-sm font-medium text-gray-900">
                ${(product.price * product.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
