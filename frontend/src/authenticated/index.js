import React from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
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
import { deleteHash, getHash } from '../utils/temporaryReviewHash'

const AuthenticatedApp = () => {
  const history = useHistory()
  const temporaryHash = getHash()

  if (temporaryHash) {
    history.push(`/review-posts?hashed_id=${temporaryHash}`)
    deleteHash()
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <SideNav />
      <div className="main-content">
        <AppHeader />
        <div className="main-content-area">
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
        </div>
        <Footer />
      </div>
    </>
  )
}

export default AuthenticatedApp
