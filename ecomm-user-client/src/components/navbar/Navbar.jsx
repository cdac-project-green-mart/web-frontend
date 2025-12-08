import React, { useState, useEffect, useRef } from "react";
import "../../index.css";
import GreenMartLogo from "../greenMartLogo/GreenMartLogo";
import CartPopup from "../cartPopup/CartPopup";
import orange from "../../assets/products/orange.jpg";
import apple from "../../assets/products/apple.jpg";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const navbarRef = useRef(null);
  const hoverTimeoutRef = useRef(null);

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Fresh Indian Orange",
      qtyLabel: "1 kg",
      qty: 1,
      price: 12,
      img: orange,
      bordered: true,
    },
    {
      id: 2,
      name: "Green Apple",
      qtyLabel: "1 kg",
      qty: 1,
      price: 14,
      img: apple,
      bordered: false,
    },
  ]);

  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(2);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const handleMouseEnter = (menu) => {
    clearTimeout(hoverTimeoutRef.current);
    setOpenMenu(menu);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setOpenMenu(null);
    }, 200);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cartOpen) return;
      if (navbarRef.current && !navbarRef.current.contains(e.target)) {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [cartOpen]);

  return (
    <>
      <div className="w-full" ref={navbarRef}>
        {/* TOP NAV BAR */}
        <nav className="w-full bg-white px-6 md:px-12 py-4 flex items-center justify-between shadow-sm">

          {/* LOGO */}
          <div className="flex items-center gap-2">
            <GreenMartLogo />
            <span className="text-2xl font-poppins font-bold">Ecobazar</span>
          </div>

          {/* SEARCH BAR (Desktop) */}
          <div className="hidden md:flex flex-1 px-10">
            <div className="relative max-w-xl mx-auto w-full">
              <input
                type="text"
                placeholder="Search"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none"
              />
              <button className="absolute right-1 top-1 bg-green-600 text-white px-4 py-1.5 rounded-md text-sm">
                Search
              </button>
            </div>
          </div>

          {/* RIGHT ICONS */}
          <div className="hidden md:flex items-center gap-8">

            {/* Like */}
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="black"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>

            {/* Cart Button */}
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setCartOpen(true)}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="black"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m12-9l2 9m-6-9v9"
                />
              </svg>

              <div className="text-sm leading-4">
                <p className="text-gray-500">Shopping cart:</p>
                <p className="font-semibold">${totalPrice}</p>
              </div>
            </div>
          </div>

          {/* MOBILE HAMBURGER */}
          <button
            className="md:hidden block"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="black"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </nav>

        {/* MOBILE MENU */}
        <div
          className={`md:hidden bg-gray-50 border-t border-gray-200 overflow-hidden transition-all duration-300 ${
            mobileOpen ? "max-h-[500px] py-4" : "max-h-0"
          }`}
        >
          <ul className="flex flex-col gap-3 px-6 text-base">
            <li className="cursor-pointer">Home</li>

            {/* SHOP */}
            <li>
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleMenu("shop")}
              >
                <span>Shop</span>
                <span className={`${openMenu === "shop" ? "rotate-180" : ""} transition-transform`}>
                  ▼
                </span>
              </div>

              {openMenu === "shop" && (
                <div className="ml-4 mt-2 flex flex-col gap-2 dropdown">
                  <p className="cursor-pointer">Shop Grid</p>
                  <p className="cursor-pointer">Product Details</p>
                </div>
              )}
            </li>

            {/* PAGES */}
            <li>
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleMenu("pages")}
              >
                <span>Pages</span>
                <span className={`${openMenu === "pages" ? "rotate-180" : ""} transition-transform`}>
                  ▼
                </span>
              </div>

              {openMenu === "pages" && (
                <div className="ml-4 mt-2 flex flex-col gap-2 dropdown">
                  <p className="cursor-pointer">FAQ</p>
                  <p className="cursor-pointer">Terms</p>
                </div>
              )}
            </li>

            {/* BLOG */}
            <li>
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleMenu("blog")}
              >
                <span>Blog</span>
                <span className={`${openMenu === "blog" ? "rotate-180" : ""} transition-transform`}>
                  ▼
                </span>
              </div>

              {openMenu === "blog" && (
                <div className="ml-4 mt-2 flex flex-col gap-2 dropdown">
                  <p className="cursor-pointer">Blog List</p>
                  <p className="cursor-pointer">Single Post</p>
                </div>
              )}
            </li>

            <li className="cursor-pointer">About Us</li>
            <li className="cursor-pointer">Contact Us</li>
          </ul>
        </div>

        {/* DESKTOP DROPDOWN NAV */}
        <div className="hidden md:block w-full bg-gray-50 border-t border-gray-200">
          <div className="flex items-center gap-10 px-12 py-4 relative font-poppins text-2xl font-medium">
            <ul className="flex items-center gap-8 text-sm">

              <li className="hover:text-green-600 cursor-pointer">Home</li>

              {/* SHOP */}
              <li
                className="relative"
                onMouseEnter={() => handleMouseEnter("shop")}
                onMouseLeave={handleMouseLeave}
              >
                <div
                  className="flex items-center gap-1 cursor-pointer hover:text-green-600"
                  onClick={() => toggleMenu("shop")}
                >
                  Shop
                  <svg className="h-3 w-3" fill="none" stroke="black" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                {openMenu === "shop" && (
                  <div className="absolute bg-white border shadow-md w-40 mt-2 rounded text-sm z-20 dropdown">
                    <p className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Shop Grid</p>
                    <p className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Product Details</p>
                  </div>
                )}
              </li>

              {/* PAGES */}
              <li
                className="relative"
                onMouseEnter={() => handleMouseEnter("pages")}
                onMouseLeave={handleMouseLeave}
              >
                <div
                  className="flex items-center gap-1 cursor-pointer hover:text-green-600"
                  onClick={() => toggleMenu("pages")}
                >
                  Pages
                  <svg className="h-3 w-3" fill="none" stroke="black" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                {openMenu === "pages" && (
                  <div className="absolute bg-white border shadow-md w-40 mt-2 rounded text-sm z-20 dropdown">
                    <p className="px-4 py-2 hover:bg-gray-100 cursor-pointer">FAQ</p>
                    <p className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Terms</p>
                  </div>
                )}
              </li>

              {/* BLOG */}
              <li
                className="relative"
                onMouseEnter={() => handleMouseEnter("blog")}
                onMouseLeave={handleMouseLeave}
              >
                <div
                  className="flex items-center gap-1 cursor-pointer hover:text-green-600"
                  onClick={() => toggleMenu("blog")}
                >
                  Blog
                  <svg className="h-3 w-3" fill="none" stroke="black" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                {openMenu === "blog" && (
                  <div className="absolute bg-white border shadow-md w-40 mt-2 rounded text-sm z-20 dropdown">
                    <p className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Blog List</p>
                    <p className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Single Post</p>
                  </div>
                )}
              </li>

              <li className="hover:text-green-600 cursor-pointer">About Us</li>
              <li className="hover:text-green-600 cursor-pointer">Contact Us</li>
            </ul>
          </div>
        </div>
      </div>

      {/* CART POPUP */}
      <CartPopup
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        setItems={setCartItems}
      />
    </>
  );
};

export default Navbar;
