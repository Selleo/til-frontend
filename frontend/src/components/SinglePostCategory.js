import React from 'react'
import { Transition } from './Transition'

const SinglePostCategory = props => {
  const { handleClick, categoryName, classNames } = props

  return (
    <Transition name="opacity-animation">
      <div onClick={handleClick} className={classNames}>
        {categoryName}
      </div>
    </Transition>
  )
}

export default SinglePostCategory
