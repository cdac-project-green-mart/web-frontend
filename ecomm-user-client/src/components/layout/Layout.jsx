import React from 'react'
import Navbar from '../navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../footer/Footer'


const Layout = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar/>
      <main className='flex grow mx-auto items-center'>
        <Outlet/>        
      </main>
      <Footer/>
    </div>
  )
}

export default Layout
