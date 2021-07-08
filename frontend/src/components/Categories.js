import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { saveCategoryPosts } from '../store/actions/actions'
import Icon from './UI/Icon'
import { sortCategories } from '../utils/array/helpers.js'
import { useDisableActionOnRouteWithMessage } from '../utils/customHooks/useDisableActionOnRouteWithMessage'

const Categories = () => {
  const categories = useSelector(state => state.categories)
  const dispatch = useDispatch()
  const { isDisabled, notifyMessage } = useDisableActionOnRouteWithMessage(
    ['add', 'edit'],
    "Can't change view category while post is creating/editing"
  )

  useEffect(() => {
    const currentCategory = document.querySelector(
      '.categories__single-category.-active'
    )

    if (currentCategory) {
      currentCategory.scrollIntoView({
        behavior: 'smooth',
      })
    }
  })

  const handleClick = (e, id) => {
    if (isDisabled) {
      notifyMessage(e)
    }
    dispatch(saveCategoryPosts(id))
  }

  const sortedCategories = sortCategories(categories)

  return sortedCategories.map(({ id, name }) => (
    <NavLink
      key={name}
      to={`/category/${name}`}
      className="categories__single-category"
      activeClassName="-active"
    >
      <div className="categories__icon">
        <Icon categoryName={name} />
      </div>
      <div className="categories__name">
        <div className="categories__name" onClick={e => handleClick(e, id)}>
          {name}
        </div>
      </div>
    </NavLink>
  ))
}

export default Categories
