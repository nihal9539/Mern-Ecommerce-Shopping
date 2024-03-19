import React from 'react'
import Header from '../Heading/Header'
import Footer from '../Footer/Footer'
import { Outlet } from "react-router-dom"

const Layout = () => {
    return (
        <>
      <div>
        <Header />
        <Outlet />
      </div>
    </>
    )
}

export default Layout

