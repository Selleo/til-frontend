import React from 'react'
import AppHeader from '../components/AppHeader'
import SideNav from '../components/SideNav'
import MainRoutes from '../components/MainRoutes'
import Footer from '../components/Footer'

const NonAuthenticatedApp = () => {
  return (
    <>
      <AppHeader />
      <SideNav />
      <div className="main-content">
        <MainRoutes />
        <Footer />
      </div>
    </>
  )
}

export default NonAuthenticatedApp
