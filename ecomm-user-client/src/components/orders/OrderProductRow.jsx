import React from "react";

const OrderProductRow = ({ product }) => {
  const subtotal = product.price * product.quantity;

  return (
    <div className="grid grid-cols-4 gap-4 px-6 py-4 border-t border-gray-100 items-center">
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

      {/* Price with light background */}
      <div className="text-sm text-gray-700">
        <span className="inline-block px-3 py-1 rounded-full bg-gray-50">
          ${product.price.toFixed(2)}
        </span>
      </div>

      {/* Quantity with light background */}
      <div className="text-sm text-gray-700">
        <span className="inline-block px-3 py-1 rounded-full bg-gray-50">
          x{product.quantity}
        </span>
      </div>

      {/* Subtotal */}
      <div className="text-sm font-medium text-gray-900">
        {subtotal.toFixed(2)}
      </div>
    </div>
  );
};

export default OrderProductRow;
