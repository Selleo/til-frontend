import React, { useState } from 'react'
import Categories from '../components/Categories'
import Search from './Search'
import { Link, useHistory } from 'react-router-dom'
import classNames from 'classnames'
import { useModalWithActionOnRoute } from '../utils/customHooks/useModalWithActionOnRoute'
const SideNav = () => {
  const [isOpen, setIsOpen] = useState(false)
  const history = useHistory()
  const { triggerActionModal, ActionModal } = useModalWithActionOnRoute(
    ['add', 'edit'],
    "Can't back to home while post is creating/editing, you will lose your data",
    () => history.push('/')
  )

  const toggleSideNav = () => {
    setIsOpen(!isOpen)
  }

  const sideNavClasses = classNames('side-nav', {
    '-active': isOpen,
  })

  return (
    <>
      <div className={sideNavClasses}>
        <div className="logo">
          <Link to="/" className="logo__link" onClick={triggerActionModal}>
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
          <Categories closeSideNav={toggleSideNav} />
        </div>
      </div>
      <button className="side-nav__hamburger" onClick={toggleSideNav}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </button>
      <ActionModal />
    </>
  )
}

export default SideNav
