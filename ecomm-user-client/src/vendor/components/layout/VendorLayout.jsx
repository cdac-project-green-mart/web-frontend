import { Outlet } from 'react-router-dom'

export default function VendorLayout() {
  return (
    <div>
      <header>Vendor Header</header>
      <main>
        <Outlet />
      </main>
      <footer>Vendor Footer</footer>
    </div>
  )
}
