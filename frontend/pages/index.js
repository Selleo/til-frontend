import React, { useEffect } from 'react'
import Head from 'next/head'
// import SideNav from '../src/components/SideNav'
import AllPosts from '../src/components/AllPosts'
import { useRouter } from 'next/router'

import { useDispatch, useSelector } from 'react-redux'

import {
  saveAllCategories,
  saveAllUsers,
  saveCurrentUser,
} from '../src/store/actions/actions'
// import AuthenticatedApp from '../src/authenticated'
import useUser from '../src/utils/customHooks/useUser'

// import AppHeader from '../pages/AppHeader'
// import AuthHandler from '../src/components/AuthHandler'
// import Footer from '../src/components/Footer'
// import MainRoutes from '../src/components/MainRoutes'
// import ScrollToTop from '../src/components/ScrollToTop'
// import SideNav from './nav/SideNav'

import 'react-tippy/dist/tippy.css'

// import '../src/devicon.css'
// import '../src/assets/stylesheets/application.sass'

const App = () => {
  const router = useRouter()

  // <AllPosts />!!!!
  // return <AllPosts />
  const dispatch = useDispatch()
  const currentUser = useUser()

  useEffect(() => {
    dispatch(saveCurrentUser())
    dispatch(saveAllCategories())
    dispatch(saveAllUsers())
  }, [dispatch])

  const pageTitle = useSelector(state => state.pageTitle)
  const pageDescription = useSelector(state => state.pageDescription)
  const title = pageTitle ? `Selleo | ${pageTitle}` : 'Selleo | Today I Learned'
  const description = pageDescription || 'Today I Learned | Selleo Portal'

  return (
    <>
      <Head>
        {<title>{title}</title>}
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} /> */}
        <meta
          property="og:image"
          content={`../public/assets/images/logo.svg`}
        />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="400" />
      </Head>

      <AllPosts />
    </>
  )
}

export default App
