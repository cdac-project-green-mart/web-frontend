import React from "react";

export default function CartPopup({ open, onClose, items, setItems }) {
  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const increaseQty = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id !== id) return item;
          if (item.qty === 1) return null; // delete
          return { ...item, qty: item.qty - 1 };
        })
        .filter(Boolean)
    );
  };

  const totalPrice = items
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(2);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-[360px] bg-white z-50 shadow-xl p-5 transition-transform duration-300 flex flex-col
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* HEADER */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-semibold">Shopping Cart ({items.length})</h2>
          <button onClick={onClose} className="cursor-pointer text-xl font-medium">×</button>
        </div>

        {/* PRODUCT LIST */}
        <div className="flex-1 overflow-y-auto pr-1">
          {items.map((item) => (
            <div
              key={item.id}
              className={`flex items-center gap-3 p-3 mb-4 rounded relative ${
                item.bordered ? "border border-dashed border-gray-300" : ""
              }`}
            >
              <button
                className="cursor-pointer absolute top-2 right-2 text-gray-400 hover:text-black text-sm"
                onClick={() => removeItem(item.id)}
              >
                ×
              </button>

              <img src={item.img} className="w-20 h-20 object-cover rounded" />

              <div className="flex flex-col flex-1">
                <p className="font-medium text-[15px]">{item.name}</p>

                <p className="text-gray-500 text-sm">
                  {item.qtyLabel} × {item.price.toFixed(2)}
                </p>

                <p className="text-black text-sm font-semibold mt-1">
                  Subtotal: ${(item.price * item.qty).toFixed(2)}
                </p>

                <div className="flex items-center bg-gray-100 rounded-full px-3 py-1 w-fit mt-2">
                  <button
                    className="cursor-pointer w-7 h-7 flex items-center justify-center text-lg font-semibold text-gray-700 hover:bg-gray-200 rounded-full"
                    onClick={() => decreaseQty(item.id)}
                  >
                    -
                  </button>

                  <span className="px-4 font-medium">{item.qty}</span>

                  <button
                    className="cursor-pointer w-7 h-7 flex items-center justify-center text-lg font-semibold text-gray-700 hover:bg-gray-200 rounded-full"
                    onClick={() => increaseQty(item.id)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div>
          <div className="flex justify-between text-[15px] mb-4">
            <span className="text-gray-700">{items.length} Product</span>
            <span className="font-semibold">${totalPrice}</span>
          </div>

          <div className="flex flex-col gap-3">
            <button className="cursor-pointer bg-green-600 text-white py-3 rounded-full font-semibold text-[15px]">
              Checkout
            </button>

            <button className="cursor-pointer bg-green-100 text-green-700 py-3 rounded-full font-semibold text-[15px]">
              Go To Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
