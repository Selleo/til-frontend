import React from 'react'
import Categories from '../components/Categories'
import Search from './Search'
import { Link } from 'react-router-dom'

const SideNav = () => (
  <div className="side-nav">
    <div className="logo">
      <Link to="/" className="logo__link">
        todayilearned
      </Link>
      <a
        href="https://selleo.com/blog"
        rel="noopener noreferrer"
        target="_blank"
        className="logo__link -selleo-logo"
      >
        <img
          src={`${process.env.PUBLIC_URL}/assets/images/logo.svg`}
          alt="Selleo logo"
        />
      </a>
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

export default SideNav
