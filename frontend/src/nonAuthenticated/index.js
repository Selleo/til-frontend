import React from 'react'
import AppHeader from '../components/AppHeader'
import SideNav from '../components/SideNav'
import MainRoutes from '../components/MainRoutes'

const NonAuthenticatedApp = () => {
  return (
    <>
      <AppHeader />
      <SideNav />
      <div className="main-content" data-testid="app-main-unathorized">
        <MainRoutes />
      </div>
    </>
  )
}

export default NonAuthenticatedApp
