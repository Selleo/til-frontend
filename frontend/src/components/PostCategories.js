import React from 'react'
import classNames from 'classnames'
import ToolTip from './ToolTip'

const PostCategories = props => {
  const { categories, preview } = props

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
    moreCategories = (
      <div className="post__more-categories">
        + {categories.length - howManyCategories} more...
      </div>
    )
  }

  const postCategoriesClassnames = classNames({
    post__categories: true,
    '-preview': preview,
  })

  return (
    <div className={postCategoriesClassnames}>
      {slicedCategories.map((category, index) => {
        return (
          <ToolTip key={index} link={`/category/${category}`} name={category}>
            <div className="post__single-category">{category}</div>
          </ToolTip>
        )
      })}
      {moreCategories}
    </div>
  )
}

export default PostCategories
