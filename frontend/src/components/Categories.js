import React, { useState, useEffect } from 'react'
import { Transition } from './Transition'
import { useHistory, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ActionModal from '../components/ActionModal'
import classNames from 'classnames'
import Icon from './UI/Icon'

import { useDisableOnRoute } from '../utils/customHooks/useDisableOnRoute'
import { sortCategories } from '../utils/array/helpers.js'

const Categories = () => {
  const history = useHistory()
  const { pathname } = useLocation()

  const sortedCategories = useSelector(state =>
    sortCategories(state.categories)
  )
  const { isDisabled } = useDisableOnRoute(['add', 'edit'])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [navigationPath, setNavigationPath] = useState(null)

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
    } else !isActiveNav(name) && history.push(`/category/${name}`)
  }
  const navItemClasses = name =>
    classNames('categories__single-category', {
      '-active': isActiveNav(name),
    })

  return sortedCategories.map(({ id, name }) => (
    <div key={id}>
      <Transition name="opacity-animation">
        <div
          className={navItemClasses(name)}
          onClick={() => onNavLinkClick(name)}
        >
          <div className="categories__icon">
            <Icon name={name} />
          </div>
          <div className="categories__name">{name}</div>
        </div>
      </Transition>

      {isModalOpen && (
        <ActionModal
          action={() => history.push(navigationPath)}
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          message="If you leave, you will lose your data!"
        />
      )}
    </div>
  ))
}

export default Categories
