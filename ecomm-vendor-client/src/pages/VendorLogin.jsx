import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function VendorLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement login logic
    console.log('Login submitted:', formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-xl bg-white border border-gray-200 p-12">
        <h1 className="text-2xl font-semibold text-gray-900 text-center mb-10">
          Vendor Portal Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm text-gray-700 mb-2">
              Vendor ID / Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-600"
              placeholder="Enter your email or vendor ID"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-600"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <div className="mt-2 text-right">
              <Link to="/vendor/forgot-password" className="text-sm text-blue-500 hover:text-blue-600">
                Forgot Password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-3 px-4 hover:bg-gray-800 transition font-medium mt-4"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <span className="text-sm text-gray-600">Don't have an account? </span>
          <Link to="/vendor/register" className="text-sm text-blue-500 hover:text-blue-600">
            Register
          </Link>
        </div>

        <div className="mt-6 text-center text-sm text-gray-400">
          © 2025 VendorPortal
        </div>
      </div>
    </div>
  );
}
