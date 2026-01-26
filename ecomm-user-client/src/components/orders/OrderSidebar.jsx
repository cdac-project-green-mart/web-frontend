import React from 'react'
import PropTypes from 'prop-types'
import cartIcon from '../../assets/cart.svg'
import dashboardIcon from '../../assets/dashboard.svg'
import historyIcon from '../../assets/history.svg'
import wishlistIcon from '../../assets/favourites.svg'
import settingsIcon from '../../assets/settings.svg'
import logOutIcon from '../../assets/logout.svg'

const OrderSidebar = ({ activeItem }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: dashboardIcon },
    { id: 'order-history', label: 'Order History', icon: historyIcon },
    { id: 'wishlist', label: 'Wishlist', icon: wishlistIcon },
    { id: 'shopping-cart', label: 'Shopping Cart', icon: cartIcon },
    { id: 'settings', label: 'Settings', icon: settingsIcon },
    { id: 'log-out', label: 'Log-out', icon: logOutIcon },
  ]

  return (
    <div className="w-64 p-6">
      <div className="bg-white border border-gray-200 rounded-lg pt-4 pb-4">
        <h2 className="text-lg font-medium text-gray-900 mb-6 px-4">Navigation</h2>
        <nav className="space-y-1">
          {menuItems.map(({ id, label, icon }) => {
            const isActive = id === activeItem
            return (
              <a
                key={id}
                href="#"
                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md border-l-4 transition
                  ${
                    isActive
                      ? 'bg-gray-100 text-gray-900 border-green-500'
                      : 'text-gray-600 border-transparent hover:bg-gray-50 hover:text-gray-900'
                  }`}
              >
                <img src={icon} alt={label} className="w-5 h-5" />
                {label}
              </a>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

OrderSidebar.propTypes = {
  activeItem: PropTypes.string.isRequired,
}

export default OrderSidebar
