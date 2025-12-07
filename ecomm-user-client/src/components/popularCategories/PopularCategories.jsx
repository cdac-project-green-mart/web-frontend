import React from "react";
import CategoryCard from "./CategoryCard";

import freshFruit from "../../assets/fresh-fruit.png";
import freshVeg from "../../assets/fresh-veg.png";
import meatFish from "../../assets/meat-fish.png";
import snacks from "../../assets/snacks.png";
import beverages from "../../assets/beverages.png";
import beauty from "../../assets/beauty.png";
import bakery from "../../assets/bakery.png";
import baking from "../../assets/baking.png";
import cooking from "../../assets/cooking.png";
import diabetic from "../../assets/diabetic.png";
import detergents from "../../assets/detergents.png";
import oil from "../../assets/oil.png";

export default function PopularCategories() {
  const categories = [
    { image: freshFruit, title: "Fresh Fruit" },
    { image: freshVeg, title: "Fresh Vegetables" },
    { image: meatFish, title: "Meat & Fish" },
    { image: snacks, title: "Snacks" },
    { image: beverages, title: "Beverages" },
    { image: beauty, title: "Beauty & Health" },
    { image: bakery, title: "Bread & Bakery" },
    { image: baking, title: "Baking Needs" },
    { image: cooking, title: "Cooking" },
    { image: diabetic, title: "Diabetic Food" },
    { image: detergents, title: "Dish Detergents" },
    { image: oil, title: "Oil" },
  ];

  return (
    <div className="my-10 w-full flex justify-center font-[poppins]">
      <div className="w-full max-w-[1320px] px-4">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[22px] font-semibold">Popular Categories</h2>
          <button className="text-green-600 font-medium hover:underline flex items-center gap-1">
            View All →
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((cat, idx) => (
            <CategoryCard key={idx} image={cat.image} title={cat.title} />
          ))}
        </div>
      </div>
    </div>
  );
}
