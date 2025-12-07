import React, { useState } from "react";
import { Link } from "react-router-dom";
import eyeIcon from "../assets/eye.svg";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-white">
      <div className="bg-white p-8 rounded-2xl shadow-[0_10px_60px_rgba(0,0,0,0.06)] w-96 text-center">
        <h2 className="text-2xl font-bold mb-6">Sign In</h2>

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
          <img
            src={eyeIcon}
            onClick={() => setShowPassword(!showPassword)}
            className="w-5 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer opacity-70 hover:opacity-100"
          />
        </div>

        <div className="flex justify-between items-center mb-4 text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" /> Remember me
          </label>
          <button className="text-gray-500 hover:text-black">Forget Password</button>
        </div>

        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-full text-lg transition">
          Login
        </button>

        <p className="mt-4 text-sm">
          Don’t have account?{" "}
          <Link to="/Register" className="font-bold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
