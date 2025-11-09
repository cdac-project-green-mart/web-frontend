import React, { useState } from "react";
import logo from "../../assets/green_mart_logo.jpg";
import favourites from "../../assets/favourites.svg";
import cart from "../../assets/cart.svg";
import user from "../../assets/user-solid-full.svg";
import dropDown from "../../assets/caret-down-solid-full.svg";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md px-4 py-3">
      {/* 12 Column Layout */}
      <div className="grid grid-cols-12 items-center gap-4">
        
        {/* Logo (col-3 mobile, col-2 desktop) */}
        <div className="col-span-6 md:col-span-2 flex items-center gap-2 font-semibold text-lg">
          <img src={logo} alt="logo" className="w-8" />
          Green Mart
        </div>

        {/* Search (hidden on mobile) */}
        <div className="hidden md:col-span-6 md:block">
          <input
            type="text"
            placeholder="Search eco-friendly products..."
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-green-400"
          />
        </div>

        {/* Icons + Dropdown (col-4 desktop) */}
        <div className="col-span-6 md:col-span-4 flex justify-end items-center gap-5">
          
          {/* Mobile Toggle */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </button>

          {/* Desktop Icons */}
          <div className="hidden md:flex gap-5 items-center">
            <img src={favourites} alt="" className="h-6 w-6 cursor-pointer"/>
            <img src={cart} alt="" className="h-6 w-6 cursor-pointer"/>

            <div className="relative cursor-pointer" onClick={() => setOpen(!open)}>
              <div className="flex items-center gap-1">
                <img src={user} className="h-6 w-6" />
                <img src={dropDown} className="h-4 w-4" />
              </div>

              {open && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow text-sm z-50">
                  <div className="px-3 py-2 font-semibold border-b">Hello, User</div>
                  <a href="/profile" className="block px-3 py-2 hover:bg-green-100">Profile</a>
                  <a href="/orders" className="block px-3 py-2 hover:bg-green-100">My Orders</a>
                  <a href="/settings" className="block px-3 py-2 hover:bg-green-100">Settings</a>
                  <a href="/help" className="block px-3 py-2 hover:bg-green-100">Help & Support</a>
                  <button className="w-full text-left px-3 py-2 hover:bg-green-100">Logout</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="mt-3 md:hidden space-y-2 text-sm">
          <input
            type="text"
            placeholder="Search eco-friendly products..."
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3"
          />
          <a href="/profile" className="p-3 block py-2 border-b rounded-sm hover:bg-green-100">Profile</a>
          <a href="/orders" className="p-3 block py-2 border-b hover:bg-green-100">My orders</a>
          <a href="/orders" className="p-3 block py-2 border-b hover:bg-green-100">Settings</a>
          <a href="/products" className="p-3 block py-2 border-b hover:bg-green-100">Help and support</a>
          <a href="/about" className="p-3 block py-2 border-b hover:bg-green-100">Logout</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
