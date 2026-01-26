import { Outlet } from 'react-router-dom'
import VendorHeader from './VendorHeader'
import VendorFooter from './VendorFooter'
import VendorSidebar from './VendorSidebar'

export default function VendorLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="flex flex-1">
        <VendorSidebar />
        <div className="flex-1 flex flex-col">
          <VendorHeader />
          <main className="flex-grow px-6 py-6">
            <Outlet />
          </main>
          <VendorFooter />
        </div>
      </div>
    </div>
  )
}

