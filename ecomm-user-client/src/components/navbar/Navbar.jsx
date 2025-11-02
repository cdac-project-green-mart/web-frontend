import React, { useState } from 'react'
import logo from "../../assets/green_mart_logo.jpg"
import favourites from "../../assets/favourites.svg"
import cart from "../../assets/cart.svg"
import user from '../../assets/user-solid-full.svg'
import dropDown from "../../assets/caret-down-solid-full.svg"
const Navbar = () => {
    const [open, setOpen] = useState(false);
    return (
        <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
            {/* Logo / Brand */}
            <div className="text-xl  flex justify-around">
                <img src={logo} alt="logo" className='w-7' />
                Green Mart
            </div>

            {/* Search Bar */}
            <div className=" px-10">
                <div className="relative mx-auto">
                    <input
                        type="text"
                        placeholder="Search eco-friendly products..."
                        className=" w-150 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-green-400"
                    />
                </div>
            </div>


            {/* Links */}
            <ul className="flex gap-6">
                <li><a href="/" className="hover:text-green-600">Home</a></li>
                <li><a href="/" className="hover:text-green-600">Categories</a></li>
                <li><a href="/products" className="hover:text-green-600">About Us</a></li>
                <li><a href="/about" className="hover:text-green-600">Contact</a></li>
                <li><a href=""><img src={favourites} alt="" className='h-6 w-6' /></a></li>
                <li><a href=""><img src={cart} alt="" className='h-6 w-6' /></a></li>
                <li className="relative">
                    <div className='flex items-center'
                        onClick={() => setOpen(!open)}>
                        <img
                            src={user}
                            className="h-6 w-6 cursor-pointer"
                        />
                        <img src={dropDown} alt="" />


                    </div>


                    {open && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow text-sm">

                            {/* Hello username row */}
                            <div className="px-3 py-2 font-semibold text-gray-700 border-b">
                                Hello, User
                            </div>

                            <a href="/profile" className="block px-3 py-2 hover:bg-gray-100">
                                Profile
                            </a>
                            <a href="/orders" className="block px-3 py-2 hover:bg-gray-100">
                                My Orders
                            </a>
                            <a href="/settings" className="block px-3 py-2 hover:bg-gray-100">
                                Settings
                            </a>
                            <a href="/help" className="block px-3 py-2 hover:bg-gray-100">
                                Help & Support
                            </a>
                            <button className="w-full text-left px-3 py-2 hover:bg-gray-100">
                                Logout
                            </button>
                        </div>
                    )}

                </li>
            </ul>
        </nav>
    );
};

export default Navbar;

