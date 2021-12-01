import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { Transition } from './Transition'
import Icon from './UI/Icon'
import ActionModal from '../components/ActionModal'

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

  const onNavLinkClick = name => {
    if (isDisabled) {
      setNavigationPath(`/category/${name}`)
      setIsModalOpen(true)
    } else `/category/${name}` !== pathname && history.push(`/category/${name}`)
  }

  return sortedCategories.map(({ id, name }) => (
    <div key={id}>
      <Transition name="opacity-animation">
        <div
          className={`${
            pathname === `/category/${name}` && '-active'
          } categories__single-category`}
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
