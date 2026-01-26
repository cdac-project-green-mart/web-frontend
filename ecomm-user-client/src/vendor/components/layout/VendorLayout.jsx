import { Outlet } from 'react-router-dom'
import VendorHeader from './VendorHeader'

export default function VendorLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <VendorHeader />
      <main className="flex-grow container mx-auto px-4 py-6">
        <Outlet />
      </main>
      <footer className="bg-gray-800 text-gray-300 text-center py-4 text-sm">
        &copy; 2026 GreenMart Vendor Portal
      </footer>
    </div>
  )
}

