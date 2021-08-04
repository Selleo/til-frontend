import React, { useState } from 'react'
import classNames from 'classnames'
import ToolTip from './ToolTip'
import { Transition, delayStep, animationDuration } from './Transition'

const PostCategories = props => {
  const { categories, preview, isHidden } = props
  const [showRestCategories, setShowRestCategories] = useState(false)
  const toogleShowRestCategories = () => {
    setShowRestCategories(!showRestCategories)
  }

  const postCategoriesClassnames = classNames({
    post__categories: true,
    '-preview': preview,
  })

  const postSingeCategoryWrapperClassnames = classNames(
    'post__single-category-wrapper',
    {
      '-expanded-categories': showRestCategories,
    }
  )

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

    moreCategories = restCategories.map(({ id, name, url }) => {
      return (
        <div className={postSingeCategoryWrapperClassnames} key={id}>
          <ToolTip isHidden={isHidden} id={id} name={name} url={url}>
            <div className="post__single-category">{name}</div>
          </ToolTip>
        </div>
      )
    })
  }
  const showRestCategoriesButtonText = showRestCategories
    ? 'Show less'
    : `${categories.length - howManyCategories} more...`

  let delay = animationDuration // animate first whole post after that time render categories

  return (
    <div className={postCategoriesClassnames}>
      {slicedCategories.map(({ id, name, url }) => {
        delay += delayStep
        return (
          <div className={postSingeCategoryWrapperClassnames} key={id}>
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
