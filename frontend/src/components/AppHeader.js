import React from 'react'
import AdminPanel from '../authenticated/AdminPanel'
import useUser from '../utils/customHooks/useUser'
import { Link } from 'react-router-dom'
import LogInButton from './LogInButton'
import { Transition } from './Transition'

const AppHeader = () => {
  const user = useUser()

  return (
    <Transition name="opacity-animation">
      <div className="app-header">
        <Link to="/" className="logo__link">
          todayilearned
        </Link>
        {user ? <AdminPanel /> : <LogInButton className="login-link" />}
      </div>
    </Transition>
  )
}

export default AppHeader
