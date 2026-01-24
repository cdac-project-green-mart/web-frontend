import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home.jsx'
import Products from '../pages/Products.jsx'
import Cart from '../pages/Cart.jsx'
import Login from '../pages/Login.jsx'
import Register from '../pages/Register.jsx'
import Checkout from '../pages/Checkout.jsx'
import Orders from '../pages/Orders.jsx'
import Layout from '../components/layout/Layout.jsx'
import NotFound from '../pages/NotFound.jsx'
import About from '../pages/About.jsx'

// Vendor imports
import VendorLayout from '../vendor/components/layout/VendorLayout.jsx'
import VendorDashboard from '../vendor/pages/VendorDashboard.jsx'
import VendorInventory from '../vendor/pages/VendorInventory.jsx'
import VendorAddProduct from '../vendor/pages/VendorAddProduct.jsx'
import VendorOrders from '../vendor/pages/VendorOrders.jsx'
import VendorOrderDetails from '../vendor/pages/VendorOrderDetails.jsx'
import VendorReturns from '../vendor/pages/VendorReturns.jsx'
import VendorPayments from '../vendor/pages/VendorPayments.jsx'
import VendorReports from '../vendor/pages/VendorReports.jsx'
import VendorLogin from '../vendor/pages/VendorLogin.jsx'
import VendorRegister from '../vendor/pages/VendorRegister.jsx'
import VendorSettings from '../vendor/pages/VendorSettings.jsx'

export default function Router() {
  return (
    <Routes>
      {/* User Routes */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="orders" element={<Orders />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Vendor Routes */}
      <Route path="/vendor/login" element={<VendorLogin />} />
      <Route path="/vendor/register" element={<VendorRegister />} />
      <Route path="/vendor" element={<VendorLayout />}>
        <Route index element={<VendorDashboard />} />
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
