import { range } from '../array/helpers'

export const usePagination = posts => {
  const { pageNumber, totalPages } = posts

  const DOTS = '...'
  const PREV = 'Prev'
  const NEXT = 'Next'

  const paginationRange = () => {
    if (4 >= totalPages) {
      return range(1, totalPages)
    }

    const leftSiblingIndex = Math.max(pageNumber - 1, 1)
    const rightSiblingIndex = Math.min(pageNumber + 1, totalPages)

    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 5
      let leftRange = range(1, leftItemCount)

      return [...leftRange, DOTS, totalPages]
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 5
      let rightRange = range(totalPages - rightItemCount + 1, totalPages)

      return [1, DOTS, ...rightRange]
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex)
      return [1, DOTS, ...middleRange, DOTS, totalPages]
    }
  }

  const paginationArray = paginationRange()

  if (pageNumber !== 1) {
    paginationArray.unshift(PREV)
  }
  if (pageNumber !== totalPages) {
    paginationArray.push(NEXT)
  }

  return paginationArray
}
