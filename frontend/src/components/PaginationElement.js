import React from 'react'
import classNames from 'classnames'
import { useSelector } from 'react-redux'

const PaginationElement = ({ page }) => {
  const pageNumber = useSelector(({ posts }) => posts.pageNumber)

  const className = classNames({
    pagination__page: true,
    '-active': pageNumber === page,
    '-dot': page === '...',
  })

  return <button className={className}>{page}</button>
}

export default PaginationElement
