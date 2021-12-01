import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
  saveAllCategories,
  saveCurrentUser,
  saveAllUsers,
  saveAllPosts,
} from './store/actions/actions'
import AuthenticatedApp from './authenticated'
import useUser from './utils/customHooks/useUser'

import AuthHandler from './components/AuthHandler'
import ScrollToTop from './components/ScrollToTop'
import AppHeader from './components/AppHeader'
import SideNav from './components/SideNav'
import MainRoutes from './components/MainRoutes'
import Footer from './components/Footer'
// needed for styling that has not been changed yet
import './App.css'
import './devicon.css'
import './assets/stylesheets/application.sass'
import 'react-tippy/dist/tippy.css'

const App = () => {
  const dispatch = useDispatch()
  const currentUser = useUser()

  useEffect(() => {
    dispatch(saveAllPosts())
    dispatch(saveCurrentUser())
    dispatch(saveAllCategories())
    dispatch(saveAllUsers())
  }, [dispatch])

  return (
    <Router>
      <div className="app-main" data-testid="app-main">
        <ScrollToTop />
        <SideNav />
        <div className="main-content">
          <AppHeader />
          <div className="main-content-area">
            <MainRoutes />
            {currentUser && <AuthenticatedApp />}
          </div>
          <Footer />
        </div>
        <Route path="/auth">
          <AuthHandler />
        </Route>
      </div>
    </Router>
  )
}

export default App
