import React from "react";

import heartIcon from "../../assets/heart.png";     // wishlist PNG
import bagIcon from "../../assets/bag.png";       // bottom-right icon PNG

export default function ProductCard({
  image,
  title,
  price,
  oldPrice,
  rating,
  sale,
  selected,
}) {
  return (
    <div
      className={`
        relative border rounded-xl p-4 bg-white transition cursor-pointer
        ${selected ? "border-green-600 shadow-md" : "border-gray-200/60"}
        hover:shadow-md hover:border-green-500
      `}
    >
      {/* SALE BADGE */}
      {sale && (
        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
          {sale}
        </span>
      )}

      {/* ONLY HEART ICON */}
      <div className="absolute top-2 right-2 flex flex-col gap-2">
        <img
          src={heartIcon}
          alt="wishlist"
          className="w-5 h-5 opacity-80 hover:opacity-100 hover:brightness-110 cursor-pointer transition"
        />
      </div>

      {/* PRODUCT IMAGE */}
      <img
        src={image}
        alt={title}
        className="w-full h-[150px] object-contain mb-3"
      />

      {/* TITLE */}
      <p className="text-sm font-medium text-gray-800">{title}</p>

      {/* PRICE */}
      <div className="flex items-center gap-2 mt-1">
        <p className="text-green-600 font-semibold">${price}</p>
        {oldPrice && (
          <p className="line-through text-gray-400 text-sm">${oldPrice}</p>
        )}
      </div>

      {/* RATING */}
      <div className="flex items-center text-orange-400 text-xs mt-1">
        {"★".repeat(rating)}
      </div>

      {/* CART/LOCK ICON (BOTTOM-RIGHT) */}
      <img
        src={bagIcon}
        alt="cart"
        className="absolute bottom-3 right-3 w-5 h-5 opacity-80 hover:opacity-100 cursor-pointer transition"
      />
    </div>
  );
}
