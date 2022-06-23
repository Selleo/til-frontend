import { useState } from 'react'
import Categories from '../components/Categories'
import Search from './Search'
import { useRouter } from 'next/router'

import { useDisableOnRoute } from '../utils/customHooks/useDisableOnRoute'
import ActionModal from './ActionModal'
import LogoSelleo from './LogoSelleo'

const SideNav = () => {
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { isDisabled } = useDisableOnRoute(['add', 'edit'])

  const handleClick = e => {
    if (isDisabled) {
      e.preventDefault()
      setIsModalOpen(true)
      router.push('/')
    }
  }

  return (
    <>
      <div className="side-nav">
        <div className="logo">
          <div onClick={handleClick}>
            <span className="logo__link"> todayilearned</span>
          </div>
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
          action={() => router.push('/')}
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          message="If you leave, you will lose your data!"
        />
      )}
    </>
  )
}

export default SideNav
