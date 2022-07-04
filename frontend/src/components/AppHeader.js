import Link from 'next/link'
import { useRouter } from 'next/router'

import AdminPanel from '../authenticated/AdminPanel'
import useUser from '../utils/customHooks/useUser'

import { Transition } from './Transition'
import LogInButton from './LogInButton'
import NavigatorButton from './NavigatorButton'

const AppHeader = () => {
  const router = useRouter()
  const user = useUser()

  const isOnCategoryPage = router.asPath.includes('category')
  const isOnPostsPage = router.asPath.includes('posts')
  const isDisplayAllPostsButton = isOnCategoryPage || isOnPostsPage
  const isOnEditPostPage = router.asPath.includes('edit-post')

  const handleGoToBackPage = () => router.back()
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
