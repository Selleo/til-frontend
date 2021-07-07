import React from 'react'
import AdminPanel from '../authenticated/AdminPanel'
import useUser from '../utils/customHooks/useUser'
import { Link } from 'react-router-dom'
import LogInButton from './LogInButton'

const AppHeader = () => {
  const user = useUser()

  return (
    <div className="app-header">
      <Link to="/" className="logo__link">
        todayilearned
      </Link>
      {user ? <AdminPanel /> : <LogInButton className="login-link" />}
    </div>
  )
}

export default AppHeader
