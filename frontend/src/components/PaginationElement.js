import React from 'react'
import classNames from 'classnames'

const PaginationElement = ({ page, isActive, changePage }) => {
  const className = classNames('pagination__page', {
    '-active': isActive,
    '-dot': page === '...',
  })
  const handleClick = () => {
    changePage(page)
  }
  return (
    <button className={className} onClick={handleClick}>
      {page}
    </button>
  )
}

export default PaginationElement
