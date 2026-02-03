import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function ProtectedRoute({ children }) {
    const { isAuthenticated, isLoading, user } = useAuth();
    const location = useLocation();
    const isVendorRole = user?.role && ['VENDOR', 'ADMIN'].includes(user.role);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500">Loading...</p>
            </div>
        );
    }

    if (!isAuthenticated || !isVendorRole) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}
