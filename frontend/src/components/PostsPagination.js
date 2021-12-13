import React from 'react'
import { useSelector } from 'react-redux'
import { range } from '../utils/array/helpers'
import PaginationElement from './PaginationElement'

const DOTS = '...'

const PostsPagination = () => {
  const posts = useSelector(({ posts }) => posts)

  if (!posts) {
    return null
  }

  const { pageNumber, totalPages } = posts

  const paginationRange = () => {
    if (3 >= totalPages) {
      return range(1, totalPages)
    }

    const leftSiblingIndex = Math.max(pageNumber - 1, 1)
    const rightSiblingIndex = Math.min(pageNumber + 1, totalPages)
    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftRange = 0
      if (pageNumber === 1) {
        leftRange = range(1, 2)
      } else {
        leftRange = range(1, pageNumber)
      }

      return [...leftRange, DOTS, totalPages]
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightRange = 0
      if (pageNumber === totalPages) {
        rightRange = range(totalPages - 1, totalPages)
      } else {
        rightRange = range(totalPages - (totalPages - pageNumber), totalPages)
      }

      return [1, DOTS, ...rightRange]
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex)
      return [1, DOTS, ...middleRange, DOTS, totalPages]
    }
  }

  return (
    <nav className="pagination__wrapper">
      {pageNumber !== 1 && <PaginationElement page="Prev" />}

      {paginationRange().map((page, index) => (
        <PaginationElement page={page} key={index} />
      ))}

      {pageNumber !== totalPages && <PaginationElement page="Next" />}
    </nav>
  )
}

export default PostsPagination
