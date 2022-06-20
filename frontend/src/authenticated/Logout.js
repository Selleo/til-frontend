import React from 'react'
// import { Link, useHistory } from 'react-router-dom'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { deleteToken } from '../utils'
import { logOut } from '../store/actions/actions'
import Icon from '../components/UI/Icon'

const Logout = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  // const history = useHistory()

  const logOutHandler = () => {
    deleteToken()
    dispatch(logOut())
    router.push('/')
  }

  return (
    <Link href="/" onClick={logOutHandler}>
      <a className="buttons__button-logout">
        <Icon name="logout" />
        <span className="text-logout">Log out</span>
      </a>
    </Link>
  )
}

export default Logout
