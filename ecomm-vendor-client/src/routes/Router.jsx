import { Routes, Route } from 'react-router-dom'
import VendorLayout from '../components/layout/VendorLayout.jsx'
import ProtectedRoute from '../components/ProtectedRoute.jsx'
import VendorDashboard from '../pages/VendorDashboard.jsx'
import VendorInventory from '../pages/VendorInventory.jsx'
import VendorProfile from '../pages/VendorProfile.jsx'
import VendorAddProduct from '../pages/VendorAddProduct.jsx'
import VendorOrders from '../pages/VendorOrders.jsx'
import VendorOrderDetails from '../pages/VendorOrderDetails.jsx'
import VendorReturns from '../pages/VendorReturns.jsx'
import VendorPayments from '../pages/VendorPayments.jsx'
import VendorReports from '../pages/VendorReports.jsx'
import VendorLogin from '../pages/VendorLogin.jsx'
import VendorRegister from '../pages/VendorRegister.jsx'
import VendorSettings from '../pages/VendorSettings.jsx'

export default function Router() {
    return (
        <Routes>
            <Route path="/login" element={<VendorLogin />} />
            <Route path="/register" element={<VendorRegister />} />

            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <VendorLayout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<VendorDashboard />} />
                <Route path="dashboard" element={<VendorDashboard />} />
                <Route path="inventory" element={<VendorInventory />} />
                <Route path="profile" element={<VendorProfile />} />
                <Route path="add-product" element={<VendorAddProduct />} />
                <Route path="orders" element={<VendorOrders />} />
                <Route path="order-details/:id" element={<VendorOrderDetails />} />
                <Route path="returns" element={<VendorReturns />} />
                <Route path="payments" element={<VendorPayments />} />
                <Route path="reports" element={<VendorReports />} />
                <Route path="settings" element={<VendorSettings />} />
            </Route>
        </Routes>
    )
}
