import React from "react";
import googlePlaylogo from "../../assets/google-play-brands-solid.svg"
import applelogo from "../../assets/apple-brands-solid.svg"
import { Link } from "react-router-dom"
const Footer = () => {
  return (
    <footer className="w-full bg-gray-100 pt-10">

      {/* MAIN FOOTER ROW (5 columns) */}
      <div className="px-24 pb-10 grid grid-cols-1 md:grid-cols-5 gap-8">

        {/* Ecobazar Column */}
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-600 rounded-full"></div>
            <span className="text-3xl font-semibold">Ecobazar</span>
          </div>

          <p className="text-gray-600 text-sm leading-6 max-w-xs">
            Morbi cursus porttitor enim lobortis molestie. Duis gravida turpis dui,
            eget bibendum magna congue nec.
          </p>

          <div className="flex items-center gap-4 text-sm">
            <p className="border-b-2 border-green-600 pb-1 cursor-pointer">
              (219) 555–0114
            </p>
            <span>or</span>
            <p className="border-b-2 border-green-600 pb-1 cursor-pointer">
              Proxy@gmail.com
            </p>
          </div>
        </div>

        {/* My Account */}
        <div>
          <h4 className="font-semibold text-lg mb-4">My Account</h4>
          <ul className="space-y-3 text-sm text-gray-700">
            <Link to="/orders"><li className="hover:text-green-600 cursor-pointer">My Account</li></Link>
            <Link to="/orders"><li className="hover:text-green-600 cursor-pointer">Order History</li></Link>
            <Link to="/cart"><li className="hover:text-green-600 cursor-pointer">Shopping Cart</li></Link>
            <li className="hover:text-green-600 cursor-pointer text-gray-400">Wishlist (N/A)</li>
          </ul>
        </div>

        {/* Helps */}
        <div>
          <h4 className="font-semibold text-lg mb-4">Helps</h4>
          <ul className="space-y-3 text-sm text-gray-700">
            <li className="hover:text-green-600 cursor-pointer text-gray-400">Contact (N/A)</li>
            <li className="hover:text-green-600 cursor-pointer text-gray-400">Faqs (N/A)</li>
            <li className="hover:text-green-600 cursor-pointer text-gray-400">Terms & Condition (N/A)</li>
            <li className="hover:text-green-600 cursor-pointer text-gray-400">Privacy Policy (N/A)</li>
          </ul>
        </div>

        {/* Proxy */}
        <div>
          <h4 className="font-semibold text-lg mb-4">Proxy</h4>
          <ul className="space-y-3 text-sm text-gray-700">
            <Link to="/about"><li className="hover:text-green-600 cursor-pointer">About</li></Link>
            <Link to="/products"><li className="hover:text-green-600 cursor-pointer">Shop</li></Link>
            <Link to="/products"><li className="hover:text-green-600 cursor-pointer">Product</li></Link>
            <Link to="/orders"><li className="hover:text-green-600 cursor-pointer">Track Order</li></Link>
          </ul>
        </div>

        {/* Download Mobile App (5th column) */}
        <div>
          <h4 className="font-semibold text-lg mb-4">Download Mobile App</h4>

          <div className="space-y-4">

            {/* App Store Button */}
            <div className="flex items-center gap-3 bg-white border rounded-md px-4 py-3 shadow-sm cursor-pointer">
              <div className="w-6 h-6"><img src={applelogo} alt="" /></div>
              <div className="text-sm">
                <p className="text-gray-500 leading-none">Download on the</p>
                <p className="leading-none font-semibold">App Store</p>
              </div>
            </div>

            {/* Google Play Button */}
            <div className="flex items-center gap-3 bg-white border rounded-md px-4 py-3 shadow-sm cursor-pointer">
              <div className="w-6 h-6"><img src={googlePlaylogo} alt="" /></div>
              <div className="text-sm">
                <p className="text-gray-500 leading-none">Download on the</p>
                <p className="leading-none font-semibold">Google Play</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* FOOTER BOTTOM BAR */}
      <div className="w-full bg-white border-t py-4 px-24 flex items-center justify-between flex-wrap">

        <p className="text-gray-600 text-sm">
          Ecobazar eCommerce © 2021. All Rights Reserved
        </p>

        <div className="flex items-center gap-3 mt-3 md:mt-0">
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
