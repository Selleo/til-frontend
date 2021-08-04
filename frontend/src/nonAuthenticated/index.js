import React from 'react'
import AppHeader from '../components/AppHeader'
import SideNav from '../components/SideNav'
import MainRoutes from '../components/MainRoutes'
import Footer from '../components/Footer'

const NonAuthenticatedApp = () => {
  return (
    <>
      <SideNav />
      <div className="main-content">
        <AppHeader />
        <div className="main-content-area">
          <MainRoutes />
        </div>
        <Footer />
      </div>
    </>
  )
}

export default NonAuthenticatedApp
