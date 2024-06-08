import React from 'react'
import Header from '../components/Header'
import {Outlet} from 'react-router-dom'
import LeftBar from '../components/LeftBar'

const Layout = () => {
  return (
    <div>
        <Header/>
        <LeftBar/>
        <Outlet/>
    </div>
  )
}

export default Layout