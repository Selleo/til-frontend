import React from 'react'
import Categories from '../components/Categories'
import Search from './Search'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useIsOnRoute } from '../utils/customHooks/useIsOnRoute'

const SideNav = () => {
  const disable = useIsOnRoute(['add', 'edit'])

  const handleClick = e => {
    if (disable) {
      e.preventDefault()
      toast("Can't go to home while post is creating/editing")
    }
  }

  return (
    <div className="side-nav">
      <div className="logo">
        <Link to="/" className="logo__link" onClick={handleClick}>
          todayilearned
        </Link>
      </div>
      <ul className="side-nav__menu">
        <li className="side-nav__menu-item">
          <Search />
        </li>
        {/* <li className="side-nav__menu-item">Users</li> */}
        {/* <li className="side-nav__menu-item">Stats </li> */}
      </ul>
      <div className="categories">
        <Categories />
      </div>
    </div>
  )
}

export default SideNav
