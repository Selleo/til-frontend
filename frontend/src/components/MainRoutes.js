import React from 'react'
import { Switch, Route } from 'react-router-dom'
import PostsList from '../components/PostsList'
import DisplayPost from '../components/DisplayPost'
import UserPosts from './UsersPosts'
import SearchedPosts from './SearchedPosts'
import CheckIfCanReview from './CheckIfCanReview'
import useUser from '../utils/customHooks/useUser'

const MainRoutes = () => {
  const user = useUser()

  return (
    <Switch>
      <Route exact path="/">
        <PostsList />
      </Route>
      <Route path="/search">
        <SearchedPosts />
      </Route>
      <Route path="/posts/:id">
        <DisplayPost />
      </Route>
      <Route path="/category/:id">
        <PostsList withCategory />
      </Route>
      <Route path="/authors/:username">
        <UserPosts />
      </Route>
      {!user && <Route path="/review-posts" component={CheckIfCanReview} />}
    </Switch>
  )
}

export default MainRoutes
