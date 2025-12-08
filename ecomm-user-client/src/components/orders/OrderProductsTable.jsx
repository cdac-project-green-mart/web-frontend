import React from "react";
import OrderProductRow from "./OrderProductRow";

const OrderProductsTable = ({ products }) => {
  return (
    <div className="bg-white border border-gray-100 rounded-lg overflow-hidden">
      {/* Header row */}
      <div className="grid grid-cols-4 gap-4 px-6 py-3 bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wide">
        <span>Product</span>
        <span>Price</span>
        <span>Quantity</span>
        <span>Subtotal</span>
      </div>

      {/* Rows */}
      {products.map((product) => (
        <OrderProductRow key={product.id} product={product} />
      ))}
    </div>
  );
};

export default OrderProductsTable;
