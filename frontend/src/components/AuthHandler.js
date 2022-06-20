// import { useHistory } from 'react-router-dom'
import { useRouter } from 'next/router'

import { useDispatch } from 'react-redux'
import { saveCurrentUser } from '../store/actions/actions'
import { useEffect } from 'react'

const AuthHandler = () => {
  const router = useRouter()

  const token = router.query.auth_token
  const callbackURL = router.query.callback_url
  // const history = useHistory()
  const dispatch = useDispatch()

  dispatch(saveCurrentUser())

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('til_token', token)
    }
    if (callbackURL?.includes('hashed_id')) {
      router.push(callbackURL)
    } else {
      router.push('/')
    }
  }, [callbackURL, router, token])

  return null
}

export default AuthHandler
