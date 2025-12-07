import React from "react";
import ProductCard from "./ProductCard";

import apple from "../../assets/products/apple.jpg";
import orange from "../../assets/products/orange.jpg";
import cabbage from "../../assets/products/cabbage.jpg";
import lettuce from "../../assets/products/lettuce.jpg";
import eggplant from "../../assets/products/eggplant.jpg";
import potatoes from "../../assets/products/potatoes.jpg";
import corn from "../../assets/products/corn.jpg";
import cauliflower from "../../assets/products/cauliflower.jpg";
import capsicum from "../../assets/products/capsicum.jpg";
import chili from "../../assets/products/chili.jpg";

export default function PopularProducts() {
  const products = [
    { image: apple, title: "Green Apple", price: 14.99, oldPrice: 20.99, rating: 4, sale: "Sale 50%" },
    { image: orange, title: "Fresh Indian Malta", price: 20.0, rating: 4 },
    { image: cabbage, title: "Chinese Cabbage", price: 12.0, rating: 4 },
    { image: lettuce, title: "Green Lettuce", price: 9.0, rating: 4 },
    { image: eggplant, title: "Eggplant", price: 34.0, rating: 4 },

    { image: potatoes, title: "Big Potatoes", price: 20.0, rating: 4 },
    { image: corn, title: "Corn", price: 20.0, rating: 4 },
    { image: cauliflower, title: "Fresh Cauliflower", price: 12.0, rating: 4 },
    { image: capsicum, title: "Green Capsicum", price: 9.0, oldPrice: 20.99, rating: 4, sale: "Sale 50%" },
    { image: chili, title: "Green Chili", price: 34.0, rating: 4 },
  ];

  return (
    <div className="my-12 w-full flex justify-center font-[poppins]">
      <div className="w-full max-w-[1320px] px-4">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[22px] font-semibold">Popular Products</h2>

          <button className="text-green-600 font-medium hover:underline flex items-center gap-1">
            View All →
          </button>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {products.map((p, index) => (
            <ProductCard key={index} {...p} />
          ))}
        </div>

      </div>
    </div>
  );
}
