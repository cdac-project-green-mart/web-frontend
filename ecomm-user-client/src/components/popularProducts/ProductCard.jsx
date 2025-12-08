import React, { useState } from "react";

import heartIcon from "../../assets/heart.png";
import bagIcon from "../../assets/bag.png";

export default function ProductCard({
  image,
  title,
  price,
  oldPrice,
  rating = 4,
  sale,
  selected,
}) {
  const [liked, setLiked] = useState(false);
  const [hovered, setHovered] = useState(false);

  const isRed = liked || hovered;

  return (
    <div
      className={`
        relative border rounded-xl p-4 bg-white transition cursor-pointer
        ${selected ? "border-green-600 shadow-[0_0_6px_rgba(0,200,0,0.3)]" : "border-gray-200/60"}
        hover:border-green-500 hover:shadow-[0_0_6px_rgba(0,200,0,0.3)]
      `}
    >

      {/* SALE BADGE */}
      {sale && (
        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
          {sale}
        </span>
      )}

      {/* HEART ICON */}
      <div
        className="absolute top-2 right-2 cursor-pointer"
        onClick={() => setLiked((prev) => !prev)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
          src={heartIcon}
          alt="wishlist"
          style={{
            width: "20px",
            height: "20px",
            filter: isRed
              ? "invert(23%) sepia(94%) saturate(7480%) hue-rotate(356deg) brightness(96%) contrast(106%)"
              : "none",
            transition: "filter 150ms ease",
          }}
        />
      </div>

      {/* IMAGE */}
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
      <div className="flex items-center text-xs mt-1">
        <span className="text-orange-400">
          {"★".repeat(rating)}
        </span>
        <span className="text-gray-300">
          {"★".repeat(5 - rating)}
        </span>
      </div>

      {/* CART ICON */}
      <img
        src={bagIcon}
        alt="cart"
        className="absolute bottom-3 right-3 w-5 h-5 opacity-80 hover:opacity-100 cursor-pointer transition"
      />
    </div>
  );
}
