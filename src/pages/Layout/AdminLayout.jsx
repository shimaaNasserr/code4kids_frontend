import React from 'react'
import { Outlet } from 'react-router-dom'
import { Footer } from '../../components/Footer/Footer'
import AdminNavbar from '../../components/NavBar/AdminNavbar'

export const AdminLayout = () => {
  return (
    <>
<AdminNavbar />
            <div className=" mt-5">
        <Outlet />

    </div>
    <Footer />
    </>
  )
}
