import React from 'react'
import { Switch, Route } from 'react-router-dom'
import DisplayPost from '../components/DisplayPost'
import UserPosts from './UsersPosts'
import SearchedPosts from './SearchedPosts'
import CheckIfCanReview from './CheckIfCanReview'
import useUser from '../utils/customHooks/useUser'
import AllPosts from './AllPosts'
import CategoryPosts from './CategoryPosts'

const MainRoutes = () => {
  const user = useUser()

  return (
    <Switch>
      <Route exact path="/">
        <AllPosts />
      </Route>
      <Route path="/search">
        <SearchedPosts />
      </Route>
      <Route path="/posts/:id">
        <DisplayPost />
      </Route>
      <Route path="/category/:id">
        <CategoryPosts />
      </Route>
      <Route path="/authors/:username">
        <UserPosts />
      </Route>
      {!user && <Route path="/review-posts" component={CheckIfCanReview} />}
    </Switch>
  )
}

export default MainRoutes
