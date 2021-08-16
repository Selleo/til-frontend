import React, { useState } from 'react'
import classNames from 'classnames'
import { useHistory } from 'react-router-dom'
import { saveCategoryPosts } from '../store/actions/actions'
import { useDispatch } from 'react-redux'

const PostCategories = props => {
  const { categories, preview } = props
  const [showRestCategories, setShowRestCategories] = useState(false)
  const history = useHistory()
  const dispatch = useDispatch()

  const toogleShowRestCategories = () => {
    setShowRestCategories(!showRestCategories)
  }

  const handleClick = (name, id) => {
    history.push(`/category/${name}`)
    dispatch(saveCategoryPosts(id))
  }

  const postCategoriesClassnames = classNames('post__categories', {
    '-preview': preview,
  })

  const postSingeCategoryClassNames = classNames('post__single-category', {
    '-expanded-category': showRestCategories,
  })

  if (!categories) {
    return null
  }

  let howManyCategories = 3

  if (preview) {
    howManyCategories = 2
  }

  const slicedCategories = categories.slice(0, howManyCategories)

  let moreCategories = null

  if (categories.length > howManyCategories) {
    const restCategories = categories.slice(howManyCategories)

    moreCategories = restCategories.map(({ id, name }) => {
      return (
        <div
          key={id}
          onClick={() => handleClick(name, id)}
          className={postSingeCategoryClassNames}
        >
          {name}
        </div>
      )
    })
  }
  const showRestCategoriesButtonText = showRestCategories
    ? 'Show less'
    : `${categories.length - howManyCategories} more...`

  return (
    <div className={postCategoriesClassnames}>
      {slicedCategories.map(({ id, name }) => {
        return (
          <div
            key={id}
            onClick={() => handleClick(name, id)}
            className={postSingeCategoryClassNames}
          >
            {name}
          </div>
        )
      })}
      {showRestCategories && moreCategories}
      {moreCategories && (
        <div
          onClick={toogleShowRestCategories}
          className="post__single-category post__more-categories"
        >
          {showRestCategoriesButtonText}
        </div>
      )}
    </div>
  )
}

export default PostCategories
