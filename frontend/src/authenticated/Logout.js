import { useDispatch } from 'react-redux'
import { deleteToken } from '../utils'
import { logOut } from '../store/actions/actions'
import Icon from '../components/UI/Icon'
import Link from 'next/link'

const Logout = () => {
  const dispatch = useDispatch()

  const logOutHandler = () => {
    deleteToken()
    dispatch(logOut())
  }

  return (
    <Link href="/" className="buttons__button-logout">
      <a className="profile-link" onClick={logOutHandler}>
        <Icon name="logout" />
        <span className="text-logout">Log out</span>
      </a>
    </Link>
  )
}

export default Logout
