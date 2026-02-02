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

/**
 * User Client Router
 * 
 * Note: Vendor routes have been moved to ecomm-vendor-client.
 * This router now only handles user-facing routes.
 */
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
    </Routes>
  )
}
