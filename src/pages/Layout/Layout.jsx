import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/NavBar/Navbar'
import ChatbotWidget from '../ChatbotWidget./ChatbotWidget'

export const Layout = () => {
  return (
    <>
<Navbar />
            <div className=" mt-5">
        <Outlet />
        <ChatbotWidget />


    </div>
    </>
  )
}
