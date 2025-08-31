import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/NavBar/Navbar'
import ChatbotWidget from '../ChatbotWidget/ChatbotWidget'
import { Footer } from '../../components/Footer/Footer'

export const Layout = () => {
  return (
    <>
<Navbar />
            <div className=" mt-5">
        <Outlet />
        <ChatbotWidget />


    </div>
    <Footer />
    </>
  )
}
