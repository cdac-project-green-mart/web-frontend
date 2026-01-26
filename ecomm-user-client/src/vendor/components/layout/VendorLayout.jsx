import { Outlet } from 'react-router-dom'
import VendorHeader from './VendorHeader'
import VendorFooter from './VendorFooter'

export default function VendorLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <VendorHeader />
      <main className="flex-grow container mx-auto px-4 py-6">
        <Outlet />
      </main>
      <VendorFooter />
    </div>
  )
}

