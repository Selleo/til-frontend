import React from 'react'
import classNames from 'classnames'
import ToolTip from './ToolTip'
import { Transition, delayStep, animationDuration } from './Transition'

const PostCategories = props => {
  const { categories, preview, isHidden } = props

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

  let delay = animationDuration // animate first whole post after that time render categories

  return (
    <div className={postCategoriesClassnames}>
      {slicedCategories.map(({ id, name, url }) => {
        delay += delayStep
        return (
          <div className="post__single-category-wrapper" key={id}>
            <ToolTip isHidden={isHidden} id={id} name={name} url={url}>
              <Transition name="opacity-animation" delay={delay}>
                <div
                  className="post__single-category"
                  style={{ transitionDelay: `${delay}ms` }}
                >
                  {name}
                </div>
              </Transition>
            </ToolTip>
          </div>
        )
      })}
      {moreCategories}
    </div>
  )
}

export default PostCategories
