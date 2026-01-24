import { Outlet } from 'react-router-dom'

export default function VendorLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-green-700 text-white px-6 py-4 shadow-md">
        <h1 className="text-xl font-semibold">Vendor Portal</h1>
      </header>
      <main className="flex-grow container mx-auto px-4 py-6">
        <Outlet />
      </main>
      <footer className="bg-gray-800 text-gray-300 text-center py-4 text-sm">
        &copy; 2026 GreenMart Vendor Portal
      </footer>
    </div>
  )
}
