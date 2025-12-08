import React, { useState } from "react";
import { Link } from "react-router-dom";
import eyeIcon from "../assets/eye.svg";

export default function CreateAccount() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-white">
      <div className="bg-white p-8 rounded-2xl shadow-[0_10px_60px_rgba(0,0,0,0.06)] w-96 text-center">
        <h2 className="text-2xl font-bold mb-6">Create Account</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <img src={eyeIcon}
            
            onClick={() => setShowPassword(!showPassword)}
            className="w-5 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer opacity-70 hover:opacity-100"
          />
        </div>

        <div className="relative mb-4">
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm Password"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <img
            src={eyeIcon}
            onClick={() => setShowConfirm(!showConfirm)}
            className="w-5 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer opacity-70 hover:opacity-100"
          />
        </div>

        <label className="flex items-center gap-2 mb-4 text-sm">
          <input type="checkbox" /> Accept all terms & Conditions
        </label>

        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-full text-lg transition">
          Create Account
        </button>

        <p className="mt-4 text-sm">
          Already have account?  <Link
        to="/login" className="font-bold"> 
        Login
      </Link>
        </p>
      </div>
    </div>
  );
}
