import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { saveCategoryPosts } from '../store/actions/actions'
import Icon from './UI/Icon'
import { sortCategories } from '../utils/array/helpers.js'
import { useDisableOnRoute } from '../utils/customHooks/useDisableOnRoute'

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
      setModalAction(() => actionForModal)
      setIsModalOpen(true)
    }
    closeSideNav()
    dispatch(saveCategoryPosts(id))
  }

  const sortedCategories = sortCategories(categories)

  console.log(isModalOpen)

  return (
    <>
      {sortedCategories.map(({ id, name }) => {
        const categoryUrl = `/category/${name}`
        return (
          <NavLink
            key={name}
            to={categoryUrl}
            className="categories__single-category"
            activeClassName="-active"
          >
            <div className="categories__icon">
              <Icon name={name} />
            </div>
            <div className="categories__name">
              <div
                className="categories__name"
                onClick={e => handleClick(e, id, categoryUrl)}
              >
                {name}
              </div>
            </div>
          </NavLink>
        )
      })}
      {isModalOpen && (
        <ActionModal
          action={modalAction}
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          message="Can't change category while post is creating/editing, you will lose your data"
        />
      )}
    </>
  )
}

export default Categories
