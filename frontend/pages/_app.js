import React from 'react'
import App from 'next/app'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from '../src/store/reducers/reducers'
import thunk from 'redux-thunk'
import SideNav from '../src/components/SideNav'
import AppHeader from '../src/components/AppHeader'
import ScrollToTop from '../src/components/ScrollToTop'
// import MainRoutes from '../src/components/MainRoutes'
// import AuthenticatedApp from '../src/authenticated'
import AuthHandler from '../src/components/AuthHandler'
import Footer from '../src/components/Footer'

import 'react-tippy/dist/tippy.css'

import '../src/devicon.css'
import '../src/assets/stylesheets/application.sass'

const TilApp = ({ Component, pageProps }) => {
  // const currentUser = useUser()
  let composeEnhancers = compose
  if (typeof window !== 'undefined') {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  }

  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  )
  return (
    <Provider store={store}>
      <div className="app-main" data-testid="app-main">
        <ScrollToTop />
        <SideNav />
        <div className="main-content">
          <AppHeader />
          <Component {...pageProps} />
          <div className="main-content-area">
            {/* <MainRoutes /> */}
            {/* {currentUser && <AuthenticatedApp />} */}
          </div>
          <Footer />
        </div>
        {/* <div path="/auth">{<AuthHandler />}</div> */}
      </div>
    </Provider>
  )
}

export default TilApp
