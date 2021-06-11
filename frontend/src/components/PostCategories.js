import React from 'react'
import classNames from 'classnames'
import 'react-tippy/dist/tippy.css'
import { Tooltip } from 'react-tippy'

const PostCategories = ({ categories, preview }) => {
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
          <div key={index} className="post__single-category">
            <Tooltip
              interactive
              arrow
              html={
                <a
                  href={`${category}_link`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {category}
                </a>
              }
            >
              {category}
            </Tooltip>
          </div>
        )
      })}
      {moreCategories}
    </div>
  )
}

export default PostCategories
