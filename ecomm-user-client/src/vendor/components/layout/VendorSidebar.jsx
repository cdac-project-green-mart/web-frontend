import { NavLink } from 'react-router-dom'

const navItems = [
    { name: 'Dashboard', path: '/vendor/dashboard' },
    { name: 'Inventory', path: '/vendor/inventory' },
    { name: 'Orders', path: '/vendor/orders' },
    { name: 'Returns', path: '/vendor/returns' },
    { name: 'Payments', path: '/vendor/payments' },
    { name: 'Reports', path: '/vendor/reports' },
    { name: 'Settings', path: '/vendor/settings' },
]

export default function VendorSidebar() {
    return (
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
            {/* Logo / Title */}
            <div className="px-6 py-5 border-b border-gray-200">
                <div className="flex items-center gap-2">
                    <span className="text-2xl">📦</span>
                    <h1 className="text-xl font-semibold text-gray-800">Vendor Portal</h1>
                </div>
            </div>

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
                </ul>
            </nav>
        </aside>
    )
}
