import React, { useEffect, useState } from 'react'

import { useHistory, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import classNames from 'classnames'

import ActionModal from '../components/ActionModal'
import Icon from './UI/Icon'
import { Transition } from './Transition'

import { useDisableOnRoute } from '../utils/customHooks/useDisableOnRoute'
import { sortCategories } from '../utils/array/helpers.js'

const Categories = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [navigationPath, setNavigationPath] = useState(null)
  const { isDisabled } = useDisableOnRoute(['add', 'edit'])

  const history = useHistory()
  const { pathname } = useLocation()

  const sortedCategories = useSelector(state =>
    sortCategories(state.categories)
  )

  useEffect(() => {
    const currentCategory = document.querySelector(
      '.categories__single-category.-active'
    )

    if (currentCategory) {
      currentCategory.scrollIntoView({
        behavior: 'smooth',
      })
    } else {
      const firstCategory = document.querySelector(
        '.categories__single-category'
      )
      if (firstCategory) {
        firstCategory.scrollIntoView({
          behavior: 'smooth',
        })
      }
    }
  })

  const isActiveNav = name => `/category/${name}` === pathname

  const onNavLinkClick = name => {
    if (isDisabled) {
      setNavigationPath(`/category/${name}`)
      setIsModalOpen(true)
    } else
      isActiveNav(name) ? history.push('/') : history.push(`/category/${name}`)
  }
  const navItemClasses = name =>
    classNames('categories__single-category', {
      '-active': isActiveNav(name) || pathname.includes(name),
      '-color-only-stroke':
        name.toLowerCase().includes('chrome') ||
        name.toLowerCase().includes('general'),
    })

  return sortedCategories.map(({ id, name }) => (
    <button
      key={id}
      className={navItemClasses(name)}
      onClick={() => onNavLinkClick(name)}
    >
      <Transition name="opacity-animation">
        <>
          <div className="categories__icon">
            <Icon name={name} />
          </div>
          <div className="categories__name">{name}</div>
        </>
      </Transition>

      {isModalOpen && (
        <ActionModal
          action={() => history.push(navigationPath)}
          isOpen={isModalOpen}
          message="If you leave, you will lose your data!"
          setIsOpen={setIsModalOpen}
        />
      )}
    </button>
  ))
}

export default Categories
