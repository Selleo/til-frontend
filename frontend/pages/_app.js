import { useEffect } from 'react'
import { store, wrapper } from '../src/store/store'
import { Provider, useDispatch } from 'react-redux'
import SideNav from '../src/components/SideNav'
import AppHeader from '../src/components/AppHeader'
import ScrollToTop from '../src/components/ScrollToTop'
import Footer from '../src/components/Footer'
import {
  saveAllCategories,
  saveAllUsers,
  saveCurrentUser,
} from '../src/store/actions/actions'
import 'react-tippy/dist/tippy.css'
import 'react-tippy/dist/tippy.css'
import '../src/devicon.css'
import '../src/assets/stylesheets/application.sass'
import useUser from '../src/utils/customHooks/useUser'

const TilApp = ({ Component, pageProps }) => {
  const currentUser = useUser()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(saveAllCategories())
    dispatch(saveAllUsers())
  }, [dispatch, currentUser])

  useEffect(() => {
    dispatch(saveCurrentUser())
  }, [dispatch])

  return (
    <Provider store={store}>
      <div className="app-main" data-testid="app-main">
        <ScrollToTop />
        <SideNav />
        <div className="main-content">
          <AppHeader />
          <Component {...pageProps} />
          <div className="main-content-area" />
          <Footer />
        </div>
      </div>
    </Provider>
  )
}

export default wrapper.withRedux(TilApp)
