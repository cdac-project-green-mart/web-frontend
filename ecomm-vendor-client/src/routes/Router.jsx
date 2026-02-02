import { Routes, Route } from 'react-router-dom'

// Layout
import VendorLayout from '../components/layout/VendorLayout.jsx'

// Pages
import VendorDashboard from '../pages/VendorDashboard.jsx'
import VendorInventory from '../pages/VendorInventory.jsx'
import VendorAddProduct from '../pages/VendorAddProduct.jsx'
import VendorOrders from '../pages/VendorOrders.jsx'
import VendorOrderDetails from '../pages/VendorOrderDetails.jsx'
import VendorReturns from '../pages/VendorReturns.jsx'
import VendorPayments from '../pages/VendorPayments.jsx'
import VendorReports from '../pages/VendorReports.jsx'
import VendorLogin from '../pages/VendorLogin.jsx'
import VendorRegister from '../pages/VendorRegister.jsx'
import VendorSettings from '../pages/VendorSettings.jsx'

/**
 * Vendor Client Router
 * 
 * Note: Routes are at root level (/) since this is a standalone vendor app.
 * In the combined app, these were under /vendor prefix.
 */
export default function Router() {
    return (
        <Routes>
            {/* Auth Routes (outside layout) */}
            <Route path="/login" element={<VendorLogin />} />
            <Route path="/register" element={<VendorRegister />} />

            {/* Dashboard Routes (inside layout) */}
            <Route path="/" element={<VendorLayout />}>
                <Route index element={<VendorDashboard />} />
                <Route path="dashboard" element={<VendorDashboard />} />
                <Route path="inventory" element={<VendorInventory />} />
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
