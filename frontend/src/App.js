import React, { useEffect } from 'react'

import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import {
  saveAllCategories,
  saveAllUsers,
  saveCurrentUser,
} from './store/actions/actions'
import AuthenticatedApp from './authenticated'
import useUser from './utils/customHooks/useUser'

import AppHeader from './components/AppHeader'
import AuthHandler from './components/AuthHandler'
import Footer from './components/Footer'
import MainRoutes from './components/MainRoutes'
import ScrollToTop from './components/ScrollToTop'
import SideNav from './components/SideNav'

import 'react-tippy/dist/tippy.css'
import './devicon.css'
import './assets/stylesheets/application.sass'
import { Helmet } from 'react-helmet'

const App = () => {
  const dispatch = useDispatch()
  const currentUser = useUser()

  useEffect(() => {
    dispatch(saveCurrentUser())
    dispatch(saveAllCategories())
    dispatch(saveAllUsers())
  }, [dispatch])

  const pageTitle = useSelector(state => state.pageTitle)
  const title = pageTitle ? `Selleo | ${pageTitle}` : 'Selleo - Today I Learned'
  console.log(pageTitle)

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content="Today I Learned | Selleo Portal" />
        <meta
          property="og:title"
          content={`Selleo - Today I Learned / ${title}`}
        />
        <meta
          property="og:description"
          content="Today I Learned | Selleo Portal"
        />
        <meta
          property="og:image"
          content={`${process.env.PUBLIC_URL}/assets/images/logo.svg`}
        />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="400" />
      </Helmet>
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
    </>
  )
}

export default App
