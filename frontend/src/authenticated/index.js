import React from 'react'
import { Switch, Route } from 'react-router-dom'
import AddPost from '../authenticated/AddPost'
import AppHeader from '../components/AppHeader'
import EditPost from '../authenticated/EditPost'
import MainRoutes from '../components/MainRoutes'
import UserProfile from '../authenticated/UserProfile'
import ReviewPost from './ReviewPost'
import SideNav from '../components/SideNav'
import Footer from '../components/Footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AuthenticatedApp = () => {
  return (
    <div data-testid="authenticated-app">
      <ToastContainer />
      <SideNav />
      <div className="main-content">
        <AppHeader />
        <MainRoutes />
        {/* authenticated user routes */}
        <Switch>
          <Route exact path="/add-post">
            <AddPost />
          </Route>
          <Route path="/edit-post/:id">
            <EditPost />
          </Route>
          <Route path="/profile">
            <UserProfile />
          </Route>
          <Route path="/review-posts">
            <ReviewPost />
          </Route>
        </Switch>
        <Footer />
      </div>
    </div>
  )
}

export default AuthenticatedApp
