import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-50 pt-12 pb-6">

      {/* MAIN FOOTER */}
      <div className="px-12 grid grid-cols-1 md:grid-cols-5 gap-12">

        {/* LOGO + TEXT + CONTACT */}
        <div className="space-y-4 col-span-2">
          <div className="flex items-center gap-2">
            {/* Placeholder Logo */}
            <div className="w-10 h-10 bg-green-600 rounded-full"></div>
            <span className="text-2xl font-semibold">Ecobazar</span>
          </div>

          <p className="text-gray-600 text-sm leading-6 max-w-sm">
            Morbi cursus porttitor enim lobortis molestie.
            Duis gravida turpis dui, eget bibendum magna congue nec.
          </p>

          <div className="flex items-center gap-3">
            <p className="border border-green-600 px-3 py-1 rounded text-sm">
              (219) 555–0114
            </p>
            <span className="text-gray-500">or</span>
            <p className="border border-green-600 px-3 py-1 rounded text-sm cursor-pointer">
              Proxy@gmail.com
            </p>
          </div>
        </div>

        {/* COLUMN: My Account */}
        <div className="space-y-2">
          <h4 className="font-semibold text-lg">My Account</h4>
          <ul className="space-y-1 text-gray-600 text-sm">
            <li className="cursor-pointer hover:text-green-600">My Account</li>
            <li className="cursor-pointer hover:text-green-600">Order History</li>
            <li className="cursor-pointer hover:text-green-600">Shoping Cart</li>
            <li className="cursor-pointer hover:text-green-600">Wishlist</li>
          </ul>
        </div>

        {/* COLUMN: Helps */}
        <div className="space-y-2">
          <h4 className="font-semibold text-lg">Helps</h4>
          <ul className="space-y-1 text-gray-600 text-sm">
            <li className="cursor-pointer hover:text-green-600">Contact</li>
            <li className="cursor-pointer hover:text-green-600">Faqs</li>
            <li className="cursor-pointer hover:text-green-600">Terms & Condition</li>
            <li className="cursor-pointer hover:text-green-600">Privacy Policy</li>
          </ul>
        </div>

        {/* COLUMN: Proxy */}
        <div className="space-y-2">
          <h4 className="font-semibold text-lg">Proxy</h4>
          <ul className="space-y-1 text-gray-600 text-sm">
            <li className="cursor-pointer hover:text-green-600">About</li>
            <li className="cursor-pointer hover:text-green-600">Shop</li>
            <li className="cursor-pointer hover:text-green-600">Product</li>
            <li className="cursor-pointer hover:text-green-600">Track Order</li>
          </ul>
        </div>

        {/* COLUMN: App Download */}
        <div className="space-y-4">
          <h4 className="font-semibold text-lg">Download Mobile App</h4>

          {/* Button placeholders */}
          <div className="space-y-3">
            <div className="bg-black text-white rounded-md px-4 py-3 text-sm w-40 text-center">
              App Store
            </div>
            <div className="bg-gray-800 text-white rounded-md px-4 py-3 text-sm w-40 text-center">
              Google Play
            </div>
          </div>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="w-full mt-12 border-t border-gray-300 pt-4 px-12 flex items-center justify-between flex-wrap">

        {/* LEFT TEXT */}
        <p className="text-gray-600 text-sm">
          Ecobazar eCommerce © 2021. All Rights Reserved
        </p>

        {/* PAYMENT BUTTONS (placeholders) */}
        <div className="flex items-center gap-3 mt-4 md:mt-0">

          <div className="bg-gray-200 px-3 py-1 rounded text-xs">Apple Pay</div>
          <div className="bg-gray-200 px-3 py-1 rounded text-xs">VISA</div>
          <div className="bg-gray-200 px-3 py-1 rounded text-xs">Discover</div>
          <div className="bg-gray-200 px-3 py-1 rounded text-xs">Mastercard</div>
          <div className="bg-gray-200 px-3 py-1 rounded text-xs">Secure Payment</div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;
