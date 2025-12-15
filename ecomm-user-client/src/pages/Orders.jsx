import React from 'react'
import OrderHeader from '../components/orders/OrderHeader'
import OrderAddressesCard from '../components/orders/OrderAddressCard'
import OrderSummaryCard from '../components/orders/OrderSummaryCard'
import OrderStatusTracker from '../components/orders/OrderStatusTracker'
import OrderProductsTable from '../components/orders/OrderProductsTable'
import appleImg from '../assets/products/apple.jpg'
import orangeImg from '../assets/products/orange.jpg'
import OrderSidebar from '../components/orders/OrderSidebar'

// Static mock order for layout only
const order = {
  id: '#4152',
  date: 'April 24, 2021',
  productsCount: 3,
  paymentMethod: 'Paypal',
  subtotal: 365.0,
  discountPercent: 20,
  shippingLabel: 'Free',
  total: 84.0,
  statusStep: 2, // 1–4
  customer: {
    name: 'Dainne Russell',
    addressLine1: '4140 Parker Rd. Allentown, New Mexico 31134',
    email: 'dainne.ressell@gmail.com',
    phone: '(671) 555-0110',
  },
  products: [
    {
      id: 1,
      name: 'Apple',
      price: 14.0,
      quantity: 5,
      image: appleImg,
    },
    {
      id: 2,
      name: 'Orange',
      price: 14.0,
      quantity: 2,
      image: orangeImg,
    },
  ],
}

const OrderDetails = () => {
  const handleBackClick = () => {
    window.history.back()
  }

  return (
    <div className="flex min-h-screen bg-white-50 py-8">
      {/* Sidebar */}
      <OrderSidebar />
      {/* Giant container with subtle rounded corners */}
      <div className="max-w-6xl mx-auto bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-6 md:px-8 md:py-8">
        <OrderHeader
          date={order.date}
          productsCount={order.productsCount}
          onBackClick={handleBackClick}
        />

        {/* Top cards: Billing/Shipping (same container) + Order summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
          <OrderAddressesCard customer={order.customer} />
          <OrderSummaryCard
            id={order.id}
            paymentMethod={order.paymentMethod}
            subtotal={order.subtotal}
            discountPercent={order.discountPercent}
            shippingLabel={order.shippingLabel}
            total={order.total}
          />
        </div>

        <OrderStatusTracker statusStep={order.statusStep} />

        <OrderProductsTable products={order.products} />
      </div>
    </div>
  )
}

export default OrderDetails
