import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../../index.css'
import GreenMartLogo from '../greenMartLogo/GreenMartLogo'
import CartPopup from '../cartPopup/CartPopup'
import { getCartItems, getCartTotalItems, isLoggedIn, logout } from '../../utils/cartUtils'

const Navbar = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [openMenu, setOpenMenu] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState(null)

  const navbarRef = useRef(null)
  const hoverTimeoutRef = useRef(null)

  const [cartTotal, setCartTotal] = useState(0)
  const [cartItemCount, setCartItemCount] = useState(0)

  // Check login status and load user
  useEffect(() => {
    const checkAuth = () => {
      setLoggedIn(isLoggedIn())
      try {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        } else {
        setUser(null)
      }
    } catch {
      setUser(null)
    }
    }

    checkAuth()
    window.addEventListener('authChanged', checkAuth)
    window.addEventListener('storage', checkAuth)

    return () => {
      window.removeEventListener('authChanged', checkAuth)
      window.removeEventListener('storage', checkAuth)
    }
  }, [])

  // Load cart total and item count
  useEffect(() => {
    const updateCartInfo = () => {
      const cartItems = getCartItems()
      const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
      const count = getCartTotalItems()
      setCartTotal(total)
      setCartItemCount(count)
    }

    updateCartInfo()

    // Listen for cart updates
    window.addEventListener('cartUpdated', updateCartInfo)

    return () => {
      window.removeEventListener('cartUpdated', updateCartInfo)
    }
  }, [])

  const handleLogout = () => {
    logout()
    setOpenMenu(null)
    navigate('/')
  }

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu)
  }

  const handleMouseEnter = (menu) => {
    clearTimeout(hoverTimeoutRef.current)
    setOpenMenu(menu)
  }

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setOpenMenu(null)
    }, 200)
  }

  const handleSearch = (e) => {
    e?.preventDefault()
    const q = searchQuery?.trim()
    if (q) {
      navigate(`/products?q=${encodeURIComponent(q)}`)
    } else {
      navigate('/products')
    }
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cartOpen) return
      if (navbarRef.current && !navbarRef.current.contains(e.target)) {
        setOpenMenu(null)
        setMobileOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [cartOpen])

  return (
    <>
      <div className="w-full" ref={navbarRef}>
        {/* TOP NAV BAR */}
        <nav className="w-full bg-white px-6 md:px-12 py-4 flex items-center justify-between shadow-sm">
          {/* LOGO */}
          <div className="flex items-center gap-2">
            <GreenMartLogo />
            <Link to="/" className="text-2xl font-poppins font-bold">
              Ecobazar
            </Link>
          </div>

          {/* SEARCH BAR (Desktop) */}
          <div className="hidden md:flex flex-1 px-10">
            <form
              onSubmit={handleSearch}
              className="relative max-w-xl mx-auto w-full"
            >
              <input
                type="text"
                placeholder="Search products"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bg-green-600 text-white px-4 py-1.5 rounded-md text-sm hover:bg-green-700"
              >
                Search
              </button>
            </form>
          </div>

          {/* RIGHT ICONS */}
          <div className="hidden md:flex items-center gap-6">
            {/* Like */}
            <svg className="h-6 w-6 cursor-pointer" fill="none" stroke="black" strokeWidth="2" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>

            {/* User Icon / Login */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('user')}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex items-center gap-2 cursor-pointer">
                <svg className="h-6 w-6" fill="none" stroke="black" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {loggedIn && user?.name && (
                  <span className="text-sm font-medium max-w-[80px] truncate">{user.name.split(' ')[0]}</span>
                )}
              </div>
              
              {openMenu === 'user' && (
                <div className="absolute right-0 bg-white border shadow-md w-40 mt-2 rounded text-sm z-20">
                  {loggedIn ? (
                    <>
                      <Link to="/account">
                        <p className="px-4 py-2 hover:bg-gray-100 cursor-pointer">My Account</p>
                      </Link>
                      <Link to="/orders">
                        <p className="px-4 py-2 hover:bg-gray-100 cursor-pointer">My Orders</p>
                      </Link>
                      <p
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600"
                        onClick={handleLogout}
                      >
                        Logout
                      </p>
                    </>
                  ) : (
                    <>
                      <Link to="/login">
                        <p className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Log In</p>
                      </Link>
                      <Link to="/register">
                        <p className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Register</p>
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Cart Button */}
            <div
              className="flex items-center gap-2 cursor-pointer relative"
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

              {/* Cart Badge */}
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                  {cartItemCount > 9 ? '9+' : cartItemCount}
                </span>
              )}

              <div className="text-sm leading-4">
                <p className="text-gray-500">Shopping cart:</p>
                <p className="font-semibold">₹{cartTotal.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* MOBILE ICONS */}
          <div className="md:hidden flex items-center gap-4">
            {/* Mobile Cart Button */}
            <div
              className="relative cursor-pointer"
              onClick={() => setCartOpen(true)}
            >
              <svg
                className="w-6 h-6"
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
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                  {cartItemCount > 9 ? '9+' : cartItemCount}
                </span>
              )}
            </div>
            {/* Mobile Hamburger */}
            <button onClick={() => setMobileOpen(!mobileOpen)}>
              <svg className="w-7 h-7" fill="none" stroke="black" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>

        {/* MOBILE MENU */}
        <div
          className={`md:hidden bg-gray-50 border-t border-gray-200 overflow-hidden transition-all duration-300 ${
            mobileOpen ? 'max-h-[500px] py-4' : 'max-h-0'
          }`}
        >
          <ul className="flex flex-col gap-3 px-6 text-base">
            <li className="cursor-pointer">Home</li>

            {/* SHOP */}
            <li>
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleMenu('shop')}
              >
                <span>Shop</span>
                <span className={`${openMenu === 'shop' ? 'rotate-180' : ''} transition-transform`}>
                  ▼
                </span>
              </div>

              {openMenu === 'shop' && (
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
                onClick={() => toggleMenu('pages')}
              >
                <span>Pages</span>
                <span
                  className={`${openMenu === 'pages' ? 'rotate-180' : ''} transition-transform`}
                >
                  ▼
                </span>
              </div>

              {openMenu === 'pages' && (
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
                onClick={() => toggleMenu('blog')}
              >
                <span>Blog</span>
                <span className={`${openMenu === 'blog' ? 'rotate-180' : ''} transition-transform`}>
                  ▼
                </span>
              </div>

              {openMenu === 'blog' && (
                <div className="ml-4 mt-2 flex flex-col gap-2 dropdown">
                  <p className="cursor-pointer">Blog List</p>
                  <p className="cursor-pointer">Single Post</p>
                </div>
              )}
            </li>

            <li>
              <Link to="/about" className="cursor-pointer block">About Us</Link>
            </li>
            <li>
              <Link to="/contact" className="cursor-pointer block">Contact Us</Link>
            </li>
          </ul>
        </div>

        {/* DESKTOP DROPDOWN NAV */}
        <div className="hidden md:block w-full bg-gray-50 border-t border-gray-200">
          <div className="flex items-center gap-10 px-12 py-4 relative font-poppins text-2xl font-medium">
            <ul className="flex items-center gap-8 text-sm">
              <Link to="/">
                <li className="hover:text-green-600 cursor-pointer">Home</li>
              </Link>

              {/* SHOP */}
              <li
                className="relative"
                onMouseEnter={() => handleMouseEnter('shop')}
                onMouseLeave={handleMouseLeave}
              >
                <div
                  className="flex items-center gap-1 cursor-pointer hover:text-green-600"
                  onClick={() => toggleMenu('shop')}
                >
                  Shop
                  <svg
                    className="h-3 w-3"
                    fill="none"
                    stroke="black"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                {openMenu === 'shop' && (
                  <div className="absolute bg-white border shadow-md w-40 mt-2 rounded text-sm z-20 dropdown">
                    <p className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Shop Grid</p>
                    <p className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Product Details</p>
                  </div>
                )}
              </li>

              {/* PAGES */}
              <li
                className="relative"
                onMouseEnter={() => handleMouseEnter('pages')}
                onMouseLeave={handleMouseLeave}
              >
                <div
                  className="flex items-center gap-1 cursor-pointer hover:text-green-600"
                  onClick={() => toggleMenu('pages')}
                >
                  Pages
                  <svg
                    className="h-3 w-3"
                    fill="none"
                    stroke="black"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                {openMenu === 'pages' && (
                  <div className="absolute bg-white border shadow-md w-40 mt-2 rounded text-sm z-20 dropdown">
                    <Link to="/cart">
                      <p className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Cart</p>
                    </Link>
                    <Link to="/orders">
                      <p className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Orders</p>
                    </Link>
                    {loggedIn ? (
                      <>
                        <Link to="/account">
                          <p className="px-4 py-2 hover:bg-gray-100 cursor-pointer">My Account</p>
                        </Link>
                        <p
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600"
                          onClick={handleLogout}
                        >
                          Logout
                        </p>
                      </>
                    ) : (
                      <>
                        <Link to="/login">
                          <p className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Log In</p>
                        </Link>
                        <Link to="/register">
                          <p className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Register</p>
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </li>

              {/* BLOG */}
              <li
                className="relative"
                onMouseEnter={() => handleMouseEnter('blog')}
                onMouseLeave={handleMouseLeave}
              >
                <div
                  className="flex items-center gap-1 cursor-pointer hover:text-green-600"
                  onClick={() => toggleMenu('blog')}
                >
                  Blog
                  <svg
                    className="h-3 w-3"
                    fill="none"
                    stroke="black"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                {openMenu === 'blog' && (
                  <div className="absolute bg-white border shadow-md w-40 mt-2 rounded text-sm z-20 dropdown">
                    <p className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Blog List</p>
                    <p className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Single Post</p>
                  </div>
                )}
              </li>

              <Link to="/about">
                <li className="hover:text-green-600 cursor-pointer">About Us</li>
              </Link>
              <Link to="/contact">
                <li className="hover:text-green-600 cursor-pointer">Contact Us</li>
              </Link>
            </ul>
          </div>
        </div>
      </div>

      {/* CART POPUP */}
      <CartPopup open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}

export default Navbar
