import React from 'react'

// import { Link, useHistory, useLocation } from 'react-router-dom'
import Link from 'next/link'
import { useRouter } from 'next/router'

import AdminPanel from '../authenticated/AdminPanel'
import useUser from '../utils/customHooks/useUser'

import { Transition } from './Transition'
import LogInButton from './LogInButton'
import NavigatorButton from './NavigatorButton'

const AppHeader = () => {
  // const history = useHistory()
  // const { pathname } = useLocation()
  const router = useRouter()
  const user = useUser()

  const isOnCategoryPage = router.pathname.includes('category')
  const isOnPostsPage = router.pathname.includes('posts')
  const isDisplayAllPostsButton = isOnCategoryPage || isOnPostsPage
  const isOnEditPostPage = router.pathname.includes('edit-post')

  const handleGoToBackPage = () => router.goBack()
  const handleGoToAllPosts = () => router.push('/')

  return (
    <Transition name="opacity-animation">
      <div className="app-header">
        <Link href="/">
          <a className="logo__link"> todayilearned</a>
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
