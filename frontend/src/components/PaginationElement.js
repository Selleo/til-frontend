import React from 'react'
import classNames from 'classnames'

const PaginationElement = ({ page, isActive, handleClick }) => {
  const className = classNames({
    pagination__page: true,
    '-active': isActive,
    '-dot': page === '...',
  })

  return (
    <button className={className} onClick={handleClick}>
      {page}
    </button>
  )
}

export default PaginationElement
