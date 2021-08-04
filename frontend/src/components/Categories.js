import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { saveCategoryPosts } from '../store/actions/actions'
import Icon from './UI/Icon'
import { sortCategories } from '../utils/array/helpers.js'
import { useDisableOnRoute } from '../utils/customHooks/useDisableOnRoute'
import { Transition, delayStep } from './Transition'

import ActionModal from '../components/ActionModal'

const Categories = props => {
  const categories = useSelector(state => state.categories)
  const { closeSideNav } = props
  const dispatch = useDispatch()
  const history = useHistory()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalAction, setModalAction] = useState(null)
  const { isDisabled } = useDisableOnRoute(['add', 'edit'])

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

  const handleClick = (e, id, url) => {
    if (isDisabled) {
      e.preventDefault()

      const actionForModal = () => {
        dispatch(saveCategoryPosts(id))
        history.push(url)
      }
      setModalAction(() => actionForModal) // figure it out :)
      setIsModalOpen(true)
    }
    closeSideNav()
    dispatch(saveCategoryPosts(id))
  }

  const sortedCategories = sortCategories(categories)
  let delay = 0

  return (
    <>
      {sortedCategories.map(({ id, name }) => {
        const categoryUrl = `/category/${name}`
        delay += delayStep
        return (
          <NavLink
            key={name}
            to={categoryUrl}
            className="categories__single-category"
            activeClassName="-active"
            style={{ transitionDelay: `${delay}ms` }}
          >
            <Transition name="opacity-animation">
              <>
                <div className="categories__icon">
                  <Icon categoryName={name} />
                </div>
                <div
                  className="categories__name"
                  onClick={e => handleClick(e, id)}
                >
                  {name}
                </div>
              </>
            </Transition>
          </NavLink>
        )
      })}
      {isModalOpen && (
        <ActionModal
          action={modalAction}
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          message="If you leave, you will lose your data!"
        />
      )}
    </>
  )
}

export default Categories
