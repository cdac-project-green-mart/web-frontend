import React, { useState, useEffect, useRef } from "react";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const navbarRef = useRef(null);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navbarRef.current && !navbarRef.current.contains(e.target)) {
        setOpenMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full" ref={navbarRef}>


      {/* TOP NAV */}
      <nav className="w-full bg-white px-12 py-4 flex items-center justify-between shadow-sm">

        {/* LEFT: LOGO */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-600 rounded-full"></div>
          <span className="text-2xl font-semibold">Ecobazar</span>
        </div>

        {/* CENTER SEARCH */}
        <div className="flex-1 px-10">
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
        <div className="flex items-center gap-8">

          {/* Like */}
          <svg className="h-6 w-6" fill="none" stroke="black" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
          </svg>

          {/* Cart */}
          <div className="flex items-center gap-2 cursor-pointer">
            <svg className="h-6 w-6" fill="none" stroke="black" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m12-9l2 9m-6-9v9"/>
            </svg>
            <div className="text-sm leading-4">
              <p className="text-gray-500">Shopping cart:</p>
              <p className="font-semibold">$57.00</p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-2 text-sm">
            <svg className="h-5 w-5" fill="none" stroke="black" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3l2 5-3 2c1.5 3 4 5.5 7 7l2-3 5 2v3a2 2 0 01-2 2h-1C10.82 24 0 13.18 0 1V0a2 2 0 012-2h1v7z"/>
            </svg>
            <span>(219) 555-0114</span>
          </div>

        </div>
      </nav>

      {/* BOTTOM BAR */}
      <div className="w-full bg-gray-50 border-t border-gray-200">
        <div className="flex items-center gap-10 px-12 py-4 relative">

         

          {/* MENU LINKS */}
          <ul className="flex items-center gap-8 text-sm">

            {/* HOME */}
            <li className="hover:text-green-600 cursor-pointer">Home</li>

            {/* SHOP */}
            <li className="relative">
              <div
                className="flex items-center gap-1 cursor-pointer hover:text-green-600"
                onClick={() => toggleMenu("shop")}
              >
                Shop
                <svg className="h-3 w-3" fill="none" stroke="black" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
                </svg>
              </div>

              {openMenu === "shop" && (
                <div className="absolute bg-white border shadow-md w-40 mt-2 rounded text-sm z-20">
                  <p className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Shop Grid</p>
                  <p className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Product Details</p>
                </div>
              )}
            </li>

            {/* PAGES */}
            <li className="relative">
              <div
                className="flex items-center gap-1 cursor-pointer hover:text-green-600"
                onClick={() => toggleMenu("pages")}
              >
                Pages
                <svg className="h-3 w-3" fill="none" stroke="black" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
                </svg>
              </div>

              {openMenu === "pages" && (
                <div className="absolute bg-white border shadow-md w-40 mt-2 rounded text-sm z-20">
                  <p className="px-4 py-2 hover:bg-gray-100 cursor-pointer">FAQ</p>
                  <p className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Terms</p>
                </div>
              )}
            </li>

            {/* BLOG */}
            <li className="relative">
              <div
                className="flex items-center gap-1 cursor-pointer hover:text-green-600"
                onClick={() => toggleMenu("blog")}
              >
                Blog
                <svg className="h-3 w-3" fill="none" stroke="black" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
                </svg>
              </div>

              {openMenu === "blog" && (
                <div className="absolute bg-white border shadow-md w-40 mt-2 rounded text-sm z-20">
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
  );
};

export default Navbar;
