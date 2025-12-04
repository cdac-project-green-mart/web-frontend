import React from "react";
import googlePlaylogo from "../../assets/google-play-brands-solid.svg";
import applelogo from "../../assets/apple-brands-solid.svg";

const Footer = () => {
  return (
    <footer className="w-full bg-[var(--footer-bg)] text-[var(--footer-text)] pt-10 transition-colors duration-300">

      {/* MAIN FOOTER ROW */}
      <div className="px-24 pb-10 grid grid-cols-1 md:grid-cols-5 gap-8">

        {/* Ecobazar Column */}
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-600 rounded-full"></div>
            <span className="text-3xl font-semibold">Ecobazar</span>
          </div>

          <p className="text-sm leading-6 max-w-xs">
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
          <ul className="space-y-3 text-sm">
            <li className="hover:text-green-600 cursor-pointer">My Account</li>
            <li className="hover:text-green-600 cursor-pointer">Order History</li>
            <li className="hover:text-green-600 cursor-pointer">Shopping Cart</li>
            <li className="hover:text-green-600 cursor-pointer">Wishlist</li>
          </ul>
        </div>

        {/* Helps */}
        <div>
          <h4 className="font-semibold text-lg mb-4">Helps</h4>
          <ul className="space-y-3 text-sm">
            <li className="hover:text-green-600 cursor-pointer">Contact</li>
            <li className="hover:text-green-600 cursor-pointer">Faqs</li>
            <li className="hover:text-green-600 cursor-pointer">Terms & Condition</li>
            <li className="hover:text-green-600 cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        {/* Proxy */}
        <div>
          <h4 className="font-semibold text-lg mb-4">Proxy</h4>
          <ul className="space-y-3 text-sm">
            <li className="hover:text-green-600 cursor-pointer">About</li>
            <li className="hover:text-green-600 cursor-pointer">Shop</li>
            <li className="hover:text-green-600 cursor-pointer">Product</li>
            <li className="hover:text-green-600 cursor-pointer">Track Order</li>
          </ul>
        </div>

        {/* Download Mobile App */}
        <div>
          <h4 className="font-semibold text-lg mb-4">Download Mobile App</h4>

          <div className="space-y-4">

            {/* App Store Button */}
            <div
              className="flex items-center gap-3 border rounded-md px-4 py-3 shadow-sm cursor-pointer transition-colors"
              style={{
                backgroundColor: "var(--download-btn-bg)",
                color: "var(--download-btn-text)",
              }}
            >
              <div className="w-6 h-6"><img src={applelogo} alt="apple store" /></div>
              <div className="text-sm">
                <p className="leading-none" style={{ color: "var(--download-btn-text)" }}>Download on the</p>
                <p className="leading-none font-semibold" style={{ color: "var(--download-btn-text)" }}>App Store</p>
              </div>
            </div>

            {/* Google Play Button */}
            <div
              className="flex items-center gap-3 border rounded-md px-4 py-3 shadow-sm cursor-pointer transition-colors"
              style={{
                backgroundColor: "var(--download-btn-bg)",
                color: "var(--download-btn-text)",
              }}
            >
              <div className="w-6 h-6"><img src={googlePlaylogo} alt="google play" /></div>
              <div className="text-sm">
                <p className="leading-none" style={{ color: "var(--download-btn-text)" }}>Download on the</p>
                <p className="leading-none font-semibold" style={{ color: "var(--download-btn-text)" }}>Google Play</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* FOOTER BOTTOM BAR */}
      <div
        className="w-full border-t py-4 px-24 flex items-center justify-between flex-wrap transition-colors duration-300"
        style={{ backgroundColor: "var(--footer-bottom-bg)", color: "var(--footer-text)" }}
      >
        <p className="text-sm">
          Ecobazar eCommerce © 2021. All Rights Reserved
        </p>

        <div className="flex items-center gap-3 mt-3 md:mt-0">
          <div className="px-3 py-1 rounded text-xs" style={{ backgroundColor: "var(--footer-badge-bg)" }}>Apple Pay</div>
          <div className="px-3 py-1 rounded text-xs" style={{ backgroundColor: "var(--footer-badge-bg)" }}>VISA</div>
          <div className="px-3 py-1 rounded text-xs" style={{ backgroundColor: "var(--footer-badge-bg)" }}>Discover</div>
          <div className="px-3 py-1 rounded text-xs" style={{ backgroundColor: "var(--footer-badge-bg)" }}>Mastercard</div>
          <div className="px-3 py-1 rounded text-xs" style={{ backgroundColor: "var(--footer-badge-bg)" }}>Secure Payment</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
