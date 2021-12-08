import React from 'react'
import { Switch, Route } from 'react-router-dom'
import AddPost from '../authenticated/AddPost'
import EditPost from '../authenticated/EditPost'
import UserProfile from '../authenticated/UserProfile'
import ReviewPost from './ReviewPost'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AuthenticatedApp = () => (
  <>
    <ToastContainer position="top-right" autoClose={3000} />
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
  </>
)

export default AuthenticatedApp
