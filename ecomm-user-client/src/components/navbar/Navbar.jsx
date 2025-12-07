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

  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Fresh Indian Orange", qtyLabel: "1 kg", qty: 1, price: 12, img: orange, bordered: true },
    { id: 2, name: "Green Apple", qtyLabel: "1 kg", qty: 1, price: 14, img: apple, bordered: false },
  ]);

  // LIVE TOTAL PRICE
  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(2);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  // Close dropdown menus (but NOT cart popup)
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
        
        {/* NAVBAR MAIN */}
        <nav className="w-full bg-white px-6 md:px-12 py-4 flex items-center justify-between shadow-sm">

          {/* LEFT LOGO */}
          <div className="flex items-center gap-2">
            <GreenMartLogo />
            <span className="text-2xl font-poppins font-bold">Ecobazar</span>
          </div>

          {/* SEARCH BAR */}
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

            {/* LIKE ICON */}
            <svg className="h-6 w-6" fill="none" stroke="black" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>

            {/* CART BUTTON */}
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setCartOpen(true)}
            >
              <svg className="h-6 w-6" fill="none" stroke="black" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m12-9l2 9m-6-9v9"/>
              </svg>

              <div className="text-sm leading-4">
                <p className="text-gray-500">Shopping cart:</p>

                {/* DYNAMIC PRICE  */}
                <p className="font-semibold">${totalPrice}</p>
              </div>
            </div>

          </div>

          {/* MOBILE MENU TOGGLER */}
          <button className="md:hidden block" onClick={() => setMobileOpen(!mobileOpen)}>
            <svg className="w-7 h-7" fill="none" stroke="black" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>

        </nav>
      </div>

      {/* CART SIDEBAR POPUP — RECEIVES REAL CART DATA */}
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
