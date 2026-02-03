import { useState, useEffect } from 'react';
import { getUserProfile, updateUserProfile } from '../api/users';
import { useAuth } from '../context/AuthContext';

export default function VendorProfile() {
    const { refreshSession } = useAuth();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        businessName: '',
        businessAddress: '',
        gstNumber: '',
        bankAccountNumber: '',
        ifscCode: '',
        preferences: {
            newsletter: true,
            theme: 'light',
            emailNotifications: true,
            smsNotifications: false
        }
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            setLoading(true);
            const data = await getUserProfile();
            setProfile(data);
            setFormData({
                name: data.name || '',
                phone: data.phone || '',
                businessName: data.businessName || '',
                businessAddress: data.businessAddress || '',
                gstNumber: data.gstNumber || '',
                bankAccountNumber: data.bankAccountNumber || '',
                ifscCode: data.ifscCode || '',
                preferences: {
                    newsletter: data.preferences?.newsletter ?? true,
                    theme: data.preferences?.theme || 'light',
                    emailNotifications: data.preferences?.emailNotifications ?? true,
                    smsNotifications: data.preferences?.smsNotifications ?? false
                }
            });
        } catch (err) {
            setError(err.message || 'Failed to load profile');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setSaving(true);

        try {
            const updated = await updateUserProfile(formData);
            setProfile(updated);
            setEditing(false);
            setSuccess('Profile updated successfully!');
            refreshSession(); // Refresh auth context to update name in header
            setTimeout(() => setSuccess(null), 3000);
        } catch (err) {
            setError(err.message || 'Failed to update profile');
        } finally {
            setSaving(false);
        }
    };

    const resetForm = () => {
        setEditing(false);
        setFormData({
            name: profile?.name || '',
            phone: profile?.phone || '',
            businessName: profile?.businessName || '',
            businessAddress: profile?.businessAddress || '',
            gstNumber: profile?.gstNumber || '',
            bankAccountNumber: profile?.bankAccountNumber || '',
            ifscCode: profile?.ifscCode || '',
            preferences: {
                newsletter: profile?.preferences?.newsletter ?? true,
                theme: profile?.preferences?.theme || 'light',
                emailNotifications: profile?.preferences?.emailNotifications ?? true,
                smsNotifications: profile?.preferences?.smsNotifications ?? false
            }
        });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-gray-500">Loading profile...</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                                {profile?.name?.charAt(0)?.toUpperCase() || 'V'}
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-white">{profile?.name || 'Vendor'}</h1>
                                <p className="text-blue-100 text-sm">{profile?.email}</p>
                            </div>
                        </div>
                        {!editing && (
                            <button
                                onClick={() => setEditing(true)}
                                className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition font-medium"
                            >
                                Edit Profile
                            </button>
                        )}
                    </div>
                </div>

                <div className="p-6 space-y-6">
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                            {success}
                        </div>
                    )}

                    {editing ? (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Personal Information */}
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">
                                    Personal Information
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="John Doe"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            placeholder="+91 98765 43210"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Business Information */}
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">
                                    Business Information
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Business Name
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.businessName}
                                            onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                                            placeholder="My Store Pvt. Ltd."
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            GST Number
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.gstNumber}
                                            onChange={(e) => setFormData({ ...formData, gstNumber: e.target.value.toUpperCase() })}
                                            placeholder="22AAAAA0000A1Z5"
                                            maxLength={15}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Business Address
                                        </label>
                                        <textarea
                                            value={formData.businessAddress}
                                            onChange={(e) => setFormData({ ...formData, businessAddress: e.target.value })}
                                            placeholder="123 Commerce Street, Business District, Mumbai 400001"
                                            rows={2}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Bank Details */}
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">
                                    Bank Details
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Bank Account Number
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.bankAccountNumber}
                                            onChange={(e) => setFormData({ ...formData, bankAccountNumber: e.target.value.replace(/\D/g, '') })}
                                            placeholder="1234567890123456"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            IFSC Code
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.ifscCode}
                                            onChange={(e) => setFormData({ ...formData, ifscCode: e.target.value.toUpperCase() })}
                                            placeholder="ABCD0123456"
                                            maxLength={11}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Preferences */}
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">
                                    Preferences
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Theme</label>
                                        <select
                                            value={formData.preferences.theme}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    preferences: { ...formData.preferences, theme: e.target.value }
                                                })
                                            }
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        >
                                            <option value="light">Light</option>
                                            <option value="dark">Dark</option>
                                            <option value="system">System Default</option>
                                        </select>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={formData.preferences.newsletter}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        preferences: { ...formData.preferences, newsletter: e.target.checked }
                                                    })
                                                }
                                                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                                            />
                                            <span className="text-sm text-gray-700">Subscribe to newsletter</span>
                                        </label>
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={formData.preferences.emailNotifications}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        preferences: { ...formData.preferences, emailNotifications: e.target.checked }
                                                    })
                                                }
                                                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                                            />
                                            <span className="text-sm text-gray-700">Email notifications</span>
                                        </label>
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={formData.preferences.smsNotifications}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        preferences: { ...formData.preferences, smsNotifications: e.target.checked }
                                                    })
                                                }
                                                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                                            />
                                            <span className="text-sm text-gray-700">SMS notifications</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-4 border-t">
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                                >
                                    {saving ? 'Saving...' : 'Save Changes'}
                                </button>
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    disabled={saving}
                                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition disabled:opacity-50 font-medium"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="space-y-6">
                            {/* Personal Information Display */}
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">
                                    Personal Information
                                </h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    <InfoCard label="Full Name" value={profile?.name} />
                                    <InfoCard label="Email" value={profile?.email} />
                                    <InfoCard label="Phone" value={profile?.phone} />
                                </div>
                            </div>

                            {/* Business Information Display */}
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">
                                    Business Information
                                </h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    <InfoCard label="Business Name" value={profile?.businessName} />
                                    <InfoCard label="GST Number" value={profile?.gstNumber} />
                                    <InfoCard label="Business Address" value={profile?.businessAddress} className="col-span-2 md:col-span-3" />
                                </div>
                            </div>

                            {/* Bank Details Display */}
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">
                                    Bank Details
                                </h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    <InfoCard label="Account Number" value={profile?.bankAccountNumber ? maskAccountNumber(profile.bankAccountNumber) : null} />
                                    <InfoCard label="IFSC Code" value={profile?.ifscCode} />
                                </div>
                            </div>

                            {/* Preferences Display */}
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">
                                    Preferences
                                </h2>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <InfoCard label="Theme" value={profile?.preferences?.theme} className="capitalize" />
                                    <InfoCard label="Newsletter" value={profile?.preferences?.newsletter ? '✓ Subscribed' : '✕ Not subscribed'} />
                                    <InfoCard label="Email Notifications" value={profile?.preferences?.emailNotifications ? '✓ Enabled' : '✕ Disabled'} />
                                    <InfoCard label="SMS Notifications" value={profile?.preferences?.smsNotifications ? '✓ Enabled' : '✕ Disabled'} />
                                </div>
                            </div>

                            {/* Member Info */}
                            <div className="text-sm text-gray-500 pt-4 border-t">
                                Member since: {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString('en-IN', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                }) : 'N/A'}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function InfoCard({ label, value, className = '' }) {
    return (
        <div className={className}>
            <p className="text-sm text-gray-500">{label}</p>
            <p className={`font-medium text-gray-900 ${!value ? 'text-gray-400 italic' : ''}`}>
                {value || 'Not set'}
            </p>
        </div>
    );
}

function maskAccountNumber(accNo) {
    if (!accNo || accNo.length < 4) return accNo;
    return '****' + accNo.slice(-4);
}
