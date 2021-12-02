import { useHistory } from 'react-router-dom'
import { useQuery } from '../utils'
import { useDispatch } from 'react-redux'
import { saveCurrentUser } from '../store/actions/actions'

const AuthHandler = () => {
  const query = useQuery()
  const token = query.get('auth_token')
  const callbackURL = query.get('callback_url')
  const history = useHistory()
  const dispatch = useDispatch()

  window.localStorage.setItem('til_token', token)

  dispatch(saveCurrentUser())

  if (callbackURL?.includes('hashed_id')) {
    history.push(callbackURL)
  } else {
    history.push('/')
  }

  return null
}

export default AuthHandler
