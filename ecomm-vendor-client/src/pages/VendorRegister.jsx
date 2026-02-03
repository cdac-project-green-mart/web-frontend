import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { normalizeApiError } from '../api/axios.js';

export default function VendorRegister() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }
        setLoading(true);
        try {
            await register(formData.name, formData.email, formData.password);
            navigate('/', { replace: true });
        } catch (err) {
            setError(normalizeApiError(err).message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
            <div className="w-full max-w-md bg-white border border-gray-200 p-12">
                <h1 className="text-2xl font-semibold text-gray-900 text-center mb-8">
                    Vendor Registration
                </h1>

                {error && (
                    <p className="mb-4 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm text-gray-700 mb-1">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-600"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-600"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-600"
                            placeholder="At least 6 characters"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            minLength={6}
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm text-gray-700 mb-1">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-600"
                            placeholder="Confirm password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gray-900 text-white py-3 px-4 hover:bg-gray-800 disabled:opacity-50 transition font-medium"
                    >
                        {loading ? 'Creating account...' : 'Register'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <span className="text-sm text-gray-600">Already have an account? </span>
                    <Link to="/login" className="text-sm text-blue-500 hover:text-blue-600">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
