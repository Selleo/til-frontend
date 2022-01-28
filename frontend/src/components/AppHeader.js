import React from 'react'

import { Link, useHistory, useLocation } from 'react-router-dom'

import AdminPanel from '../authenticated/AdminPanel'
import useUser from '../utils/customHooks/useUser'

import { Transition } from './Transition'
import LogInButton from './LogInButton'
import NavigatorButton from './NavigatorButton'

const AppHeader = () => {
  const history = useHistory()
  const { pathname } = useLocation()
  const user = useUser()

  const isOnCategoryPage = pathname.includes('category')
  const isOnPostsPage = pathname.includes('posts')
  const isDisplayAllPostsButton = isOnCategoryPage || isOnPostsPage
  const isOnEditPostPage = pathname.includes('edit-post')

  const handleGoToBackPage = () => history.goBack()
  const handleGoToAllPosts = () => history.push('/')

  return (
    <Transition name="opacity-animation">
      <div className="app-header">
        <Link to="/" className="logo__link">
          todayilearned
        </Link>
        {isDisplayAllPostsButton && (
          <NavigatorButton action={handleGoToAllPosts} text="Go to all posts" />
        )}
        {isOnEditPostPage && (
          <NavigatorButton action={handleGoToBackPage} text="Back" />
        )}
        {user ? <AdminPanel /> : <LogInButton className="login-link" />}
      </div>
    </Transition>
  )
}

export default AppHeader
