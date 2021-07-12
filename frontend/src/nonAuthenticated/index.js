import React from 'react'
import AppHeader from '../components/AppHeader'
import SideNav from '../components/SideNav'
import MainRoutes from '../components/MainRoutes'
import Footer from '../components/Footer'

const NonAuthenticatedApp = () => {
  return (
    <>
      <SideNav />
      <div className="main-content" data-testid="app-main-unathorized">
        <AppHeader />
        <MainRoutes />
        <Footer />
      </div>
    </>
  )
}

export default NonAuthenticatedApp
