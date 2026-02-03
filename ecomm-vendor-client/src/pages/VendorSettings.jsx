import { useState, useEffect } from 'react'
import { getProfile, updateProfile } from '../api/user'
import { normalizeApiError } from '../api/axios'

export default function VendorSettings() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    phone: '',
    preferences: { newsletter: false, theme: 'light' },
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  useEffect(() => {
    getProfile()
      .then((p) => {
        setProfile(p)
        setFormData({
          phone: p?.phone ?? '',
          preferences: p?.preferences ?? { newsletter: false, theme: 'light' },
        })
      })
      .catch((err) => setError(normalizeApiError(err).message))
      .finally(() => setLoading(false))
  }, [])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    if (name === 'phone') {
      setFormData((prev) => ({ ...prev, phone: value }))
    } else if (name.startsWith('preferences.')) {
      const key = name.split('.')[1]
      setFormData((prev) => ({
        ...prev,
        preferences: { ...prev.preferences, [key]: type === 'checkbox' ? checked : value },
      }))
    }
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordData((prev) => ({ ...prev, [name]: value }))
  }

  const handleChangePassword = (e) => {
    e.preventDefault()
    // TODO: Backend does not expose password change endpoint; implement when available.
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
  }

  const handleSaveSettings = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      await updateProfile(formData)
      setProfile((prev) => ({ ...prev, ...formData }))
    } catch (err) {
      setError(normalizeApiError(err).message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-8">
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        <p className="text-gray-500">Loading...</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage profile and preferences.</p>
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
      )}

      {/* Profile */}
      <div className="bg-white border border-gray-200 rounded-lg p-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
          Profile
        </h2>

        <form onSubmit={handleSaveSettings} className="space-y-6">
          <div>
            <label htmlFor="phone" className="block text-sm text-gray-700 mb-2">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-600"
              placeholder="Enter your phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <button type="submit" disabled={saving} className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 disabled:opacity-50">
            {saving ? 'Saving...' : 'Save profile'}
          </button>
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

    </div>
  )
}
