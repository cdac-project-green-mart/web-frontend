import React from "react";
import heroImage from "../../assets/banner-img.jpg";

export default function LeftHeroBanner() {
  return (
    <div
      class="rounded-2xl p-10 h-[480px] flex items-center"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "right center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* LEFT TEXT ZONE */}
      <div class="max-w-md text-white space-y-4 font-medium">

        <h2 class="text-4xl font-bold leading-tight">
          Fresh & Healthy <br /> Organic Food
        </h2>

        <div class=" w-max px-3 py-1 rounded-md">
          <span class="font-semibold">Sale up to</span>{" "}
          <span class="bg-[#FF8A00] text-black px-2 py-1 rounded">
            30% OFF
          </span>
        </div>

        <p class="opacity-90 text-sm">Free shipping on all your order.</p>

        <button class="bg-white text-[#00B207] px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition">
          Shop now →
        </button>

      </div>
    </div>
  );
}
