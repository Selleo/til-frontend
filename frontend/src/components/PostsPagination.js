import React from 'react'
import { useSelector } from 'react-redux'
import { range } from '../utils/array/helpers'

const DOTS = 'DOTS'

const PostsPagination = () => {
  const posts = useSelector(({ posts }) => posts)

  if (!posts) {
    return null
  }

  const { pageNumber, totalPages } = posts
  const siblingCount = 1

  const paginationRange = () => {
    if (3 >= totalPages) {
      return range(1, totalPages)
    }

    const leftSiblingIndex = Math.max(pageNumber - siblingCount, 1)
    const rightSiblingIndex = Math.min(pageNumber + siblingCount, totalPages)
    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1
    const firstPageIndex = 1
    const lastPageIndex = totalPages

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

      return [firstPageIndex, DOTS, ...rightRange]
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex)
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
    }
  }

  console.log(paginationRange())

  return (
    <nav className="pagination__wrapper">
      {pageNumber !== 1 && <button className="pagination__page">Prev</button>}

      {pageNumber !== totalPages && (
        <button className="pagination__page">Next</button>
      )}
    </nav>
  )
}

export default PostsPagination
