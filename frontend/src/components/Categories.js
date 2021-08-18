import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { saveCategoryPosts } from '../store/actions/actions'
import Icon from './UI/Icon'
import { sortCategories } from '../utils/array/helpers.js'
import { useDisableActionOnRouteWithMessage } from '../utils/customHooks/useDisableActionOnRouteWithMessage'
import { Transition, delayStep } from './Transition'

const Categories = props => {
  const categories = useSelector(state => state.categories)
  const dispatch = useDispatch()
  const { closeSideNav } = props
  const disable = useIsOnRoute(['add', 'edit'])

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

  const blockClickCategory = e => {
    e.preventDefault()
    toast("Can't change view category while post is creating/editing")
  }

  const handleClick = (e, id) => {
    disable && blockSelection(e)
    closeSideNav()
    dispatch(saveCategoryPosts(id))
  }

  const sortedCategories = sortCategories(categories)
  let delay = 0

  return sortedCategories.map(({ id, name }) => {
    delay += delayStep

    return (
      <NavLink
        key={id}
        to={`/category/${name}`}
        className="categories__single-category"
        activeClassName="-active"
        style={{ transitionDelay: `${delay}ms` }}
      >
        <Transition name="opacity-animation">
          <>
            <div className="categories__icon">
              <Icon categoryName={name} />
            </div>
            <div className="categories__name" onClick={e => handleClick(e, id)}>
              {name}
            </div>
          </>
        </Transition>
      </NavLink>
    )
  })
}

export default Categories
