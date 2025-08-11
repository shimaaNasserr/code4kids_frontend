import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/NavBar/Navbar'

export const Layout = () => {
  return (
    <>
<Navbar />
            <div>
        <Outlet/>

    </div>
    </>
  )
}
