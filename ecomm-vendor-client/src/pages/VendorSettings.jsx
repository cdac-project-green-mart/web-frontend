import { useState } from 'react'

export default function VendorSettings() {
  const [addressData, setAddressData] = useState({
    shippingAddress: '',
    sameAsGst: false,
    returnAddress: '',
    pickupInstructions: '',
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const handleAddressChange = (e) => {
    const { name, value, type, checked } = e.target
    setAddressData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleChangePassword = (e) => {
    e.preventDefault()
    // TODO: Implement password change logic
    console.log('Change password:', passwordData)
    // Reset form after submission
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    })
  }

  const handleSaveSettings = (e) => {
    e.preventDefault()
    // TODO: Implement save settings logic
    console.log('Save settings:', addressData)
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage addresses, password, and preferences.</p>
      </div>

      {/* Address Settings */}
      <div className="bg-white border border-gray-200 rounded-lg p-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
          🏠 Address Settings
        </h2>

        <form onSubmit={handleSaveSettings} className="space-y-6">
          <div>
            <label htmlFor="shippingAddress" className="block text-sm text-gray-700 mb-2">
              Shipping Address
            </label>
            <input
              type="text"
              id="shippingAddress"
              name="shippingAddress"
              className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-600"
              placeholder="Enter your shipping address"
              value={addressData.shippingAddress}
              onChange={handleAddressChange}
            />
            <label className="flex items-center mt-3 text-sm text-gray-600">
              <input
                type="checkbox"
                name="sameAsGst"
                checked={addressData.sameAsGst}
                onChange={handleAddressChange}
                className="w-4 h-4 border-gray-300 rounded mr-2 cursor-pointer"
              />
              Same as GST Address
            </label>
          </div>

          <div>
            <label htmlFor="returnAddress" className="block text-sm text-gray-700 mb-2">
              Return Address
            </label>
            <input
              type="text"
              id="returnAddress"
              name="returnAddress"
              className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-600"
              placeholder="Enter your return address"
              value={addressData.returnAddress}
              onChange={handleAddressChange}
            />
          </div>

          <div>
            <label htmlFor="pickupInstructions" className="block text-sm text-gray-700 mb-2">
              Pickup Instructions (optional)
            </label>
            <input
              type="text"
              id="pickupInstructions"
              name="pickupInstructions"
              className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-600"
              placeholder="Enter pickup instructions"
              value={addressData.pickupInstructions}
              onChange={handleAddressChange}
            />
          </div>
        </form>
      </div>

      {/* Security Settings */}
      <div className="bg-white border border-gray-200 rounded-lg p-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
          🔒 Security Settings
        </h2>
        <p className="text-sm text-gray-500 mb-6">Change your account password below.</p>

        <form onSubmit={handleChangePassword} className="space-y-4 max-w-sm">
          <div>
            <label htmlFor="currentPassword" className="block text-sm text-gray-700 mb-2">
              Current Password
            </label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-600"
              placeholder=""
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
            />
          </div>

          <div>
            <label htmlFor="newPassword" className="block text-sm text-gray-700 mb-2">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-600"
              placeholder=""
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm text-gray-700 mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-600"
              placeholder=""
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800 transition font-medium text-sm mt-6"
          >
            Change Password
          </button>
        </form>
      </div>

      {/* Save Settings Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSaveSettings}
          className="bg-gray-900 text-white py-2 px-6 rounded hover:bg-gray-800 transition font-medium"
        >
          Save Settings
        </button>
      </div>
    </div>
  )
}
