import React, { useState } from 'react'
import Categories from '../components/Categories'
import Search from './Search'
import { Link, useHistory } from 'react-router-dom'
import { useDisableOnRoute } from '../utils/customHooks/useDisableOnRoute'
import ActionModal from './ActionModal'
import LogoSelleo from './LogoSelleo'

const SideNav = () => {
  const history = useHistory()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { isDisabled } = useDisableOnRoute(['add', 'edit'])

  const handleClick = e => {
    if (isDisabled) {
      e.preventDefault()
      setIsModalOpen(true)
    }
  }

  return (
    <>
      <div className="side-nav">
        <div className="logo">
          <Link to="/" className="logo__link" onClick={handleClick}>
            todayilearned
          </Link>
          <LogoSelleo className="logo__link" />
        </div>

        <ul className="side-nav__menu">
          <li className="side-nav__menu-item">
            <Search />
          </li>
        </ul>
        <div className="categories">
          <Categories />
        </div>
      </div>

      {isModalOpen && (
        <ActionModal
          action={() => history.push('/')}
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          message="If you leave, you will lose your data!"
        />
      )}
    </>
  )
}

export default SideNav
