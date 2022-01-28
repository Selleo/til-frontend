import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { deleteToken } from '../utils'
import { logOut } from '../store/actions/actions'
import Icon from '../components/UI/Icon'

const Logout = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const logOutHandler = () => {
    deleteToken()
    dispatch(logOut())
    history.push('/')
  }

  return (
    <Link to="/" className="buttons__button-logout" onClick={logOutHandler}>
      <Icon name="logout" />
      <span className="text-logout">Log out</span>
    </Link>
  )
}

export default Logout
