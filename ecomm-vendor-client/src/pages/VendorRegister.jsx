import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function VendorRegister() {
  const [formData, setFormData] = useState({
    fullName: '',
    storeName: '',
    email: '',
    password: '',
    gstNumber: '',
    gstRegisteredName: '',
    gstAddress: '',
    shippingAddress: '',
    sameAsGst: false,
    returnAddress: '',
    accountHolderName: '',
    bankName: '',
    ifscCode: '',
    accountNumber: '',
    confirmDetails: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement registration logic
    console.log('Registration submitted:', formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="w-full max-w-2xl bg-white border border-gray-200 p-12">
        <h1 className="text-2xl font-semibold text-gray-900 text-center mb-8">
          Vendor Registration
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Details */}
          <div>
            <h2 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
              📋 Basic Details
            </h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-sm text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-600"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="storeName" className="block text-sm text-gray-700 mb-1">
                  Store Name
                </label>
                <input
                  type="text"
                  id="storeName"
                  name="storeName"
                  className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-600"
                  placeholder="Enter store name"
                  value={formData.storeName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-600"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm text-gray-700 mb-1">
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
              </div>
            </div>
          </div>

          {/* GST Information */}
          <div>
            <h2 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
              📦 GST Information
            </h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="gstNumber" className="block text-sm text-gray-700 mb-1">
                  GST Number
                </label>
                <input
                  type="text"
                  id="gstNumber"
                  name="gstNumber"
                  className="w-full max-w-md px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-600"
                  placeholder="Enter GSTIN (auto fetch enabled)"
                  value={formData.gstNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="gstRegisteredName" className="block text-sm text-gray-700 mb-1">
                  GST Registered Name (auto)
                </label>
                <input
                  type="text"
                  id="gstRegisteredName"
                  name="gstRegisteredName"
                  className="w-full px-4 py-3 border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-600"
                  placeholder="Auto-filled from GST"
                  value={formData.gstRegisteredName}
                  onChange={handleChange}
                  readOnly
                />
              </div>
              <div>
                <label htmlFor="gstAddress" className="block text-sm text-gray-700 mb-1">
                  GST Address (auto)
                </label>
                <input
                  type="text"
                  id="gstAddress"
                  name="gstAddress"
                  className="w-full px-4 py-3 border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-600"
                  placeholder="Auto-filled from GST"
                  value={formData.gstAddress}
                  onChange={handleChange}
                  readOnly
                />
              </div>
            </div>
          </div>

          {/* Address Details */}
          <div>
            <h2 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
              🏠 Address Details
            </h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="shippingAddress" className="block text-sm text-gray-700 mb-1">
                  Shipping Address
                </label>
                <input
                  type="text"
                  id="shippingAddress"
                  name="shippingAddress"
                  className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-600"
                  placeholder="Enter complete shipping address"
                  value={formData.shippingAddress}
                  onChange={handleChange}
                  required
                />
                <label className="flex items-center mt-2 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    name="sameAsGst"
                    checked={formData.sameAsGst}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 border-gray-300 mr-2"
                  />
                  Same as GST Address
                </label>
              </div>
              <div>
                <label htmlFor="returnAddress" className="block text-sm text-gray-700 mb-1">
                  Return Address
                </label>
                <input
                  type="text"
                  id="returnAddress"
                  name="returnAddress"
                  className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-600"
                  placeholder="Enter return address (optional)"
                  value={formData.returnAddress}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Bank Details */}
          <div>
            <h2 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
              🏦 Bank Details
            </h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="accountHolderName" className="block text-sm text-gray-700 mb-1">
                  Account Holder Name
                </label>
                <input
                  type="text"
                  id="accountHolderName"
                  name="accountHolderName"
                  className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-600"
                  placeholder=""
                  value={formData.accountHolderName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="bankName" className="block text-sm text-gray-700 mb-1">
                    Bank Name
                  </label>
                  <input
                    type="text"
                    id="bankName"
                    name="bankName"
                    className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-600"
                    placeholder=""
                    value={formData.bankName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="ifscCode" className="block text-sm text-gray-700 mb-1">
                    IFSC Code
                  </label>
                  <input
                    type="text"
                    id="ifscCode"
                    name="ifscCode"
                    className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-600"
                    placeholder=""
                    value={formData.ifscCode}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="accountNumber" className="block text-sm text-gray-700 mb-1">
                  Account Number
                </label>
                <input
                  type="text"
                  id="accountNumber"
                  name="accountNumber"
                  className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-600"
                  placeholder=""
                  value={formData.accountNumber}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Confirmation Checkbox */}
          <label className="flex items-center text-sm text-gray-600">
            <input
              type="checkbox"
              name="confirmDetails"
              checked={formData.confirmDetails}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 border-gray-300 mr-2"
              required
            />
            I confirm that all details are correct
          </label>

          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-3 px-4 hover:bg-gray-800 transition font-medium"
          >
            Register
          </button>
        </form>

        <div className="mt-6 text-center">
          <span className="text-sm text-gray-600">Already have an account? </span>
          <Link to="/vendor/login" className="text-sm text-blue-500 hover:text-blue-600">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
