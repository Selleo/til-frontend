import React from 'react'

import { Link, useLocation } from 'react-router-dom'

import AdminPanel from '../authenticated/AdminPanel'
import useUser from '../utils/customHooks/useUser'

import { Transition } from './Transition'
import LogInButton from './LogInButton'
import GoToAllPosts from './GoToAllPosts'

const AppHeader = () => {
  const { pathname } = useLocation()
  const user = useUser()

  const isUserOnCategoryPage = pathname.includes('category')

  return (
    <Transition name="opacity-animation">
      <div className="app-header">
        <Link to="/" className="logo__link">
          todayilearned
        </Link>
        {isUserOnCategoryPage && <GoToAllPosts />}
        {user ? <AdminPanel /> : <LogInButton className="login-link" />}
      </div>
    </Transition>
  )
}

export default AppHeader
