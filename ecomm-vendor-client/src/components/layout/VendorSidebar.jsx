import { NavLink, useLocation } from 'react-router-dom'

const navItems = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Inventory', path: '/inventory' },
  { name: 'Orders', path: '/orders' },
  { name: 'Returns', path: '/returns' },
  { name: 'Payments', path: '/payments' },
  { name: 'Reports', path: '/reports' },
]

export default function VendorSidebar() {
  const location = useLocation()
  const isSettingsAccessedFromDropdown = location.state?.fromDropdown

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors ${isActive ? 'bg-gray-100 font-medium' : ''
                  }`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
          {/* Profile link */}
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors ${isActive ? 'bg-gray-100 font-medium' : ''
                }`
              }
            >
              Profile
            </NavLink>
          </li>
          {/* Settings appears only when accessed from dropdown */}
          {isSettingsAccessedFromDropdown && (
            <li>
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors ${isActive ? 'bg-gray-100 font-medium' : ''
                  }`
                }
              >
                Settings
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </aside>
  )
}
