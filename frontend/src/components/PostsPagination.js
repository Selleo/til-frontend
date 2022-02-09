import React, { useEffect } from 'react'

import { useHistory, useLocation } from 'react-router-dom'

import { usePagination } from '../utils/customHooks/usePagination'
import PaginationElement from './PaginationElement'

const PostsPagination = ({ posts }) => {
  const history = useHistory()
  const { pathname } = useLocation()
  const { pagination, PREV, NEXT, DOTS } = usePagination(posts)

  useEffect(() => {
    if (!posts.data.length) {
      return null
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }, [posts.data.length])

  const switchToSpecificPage = page => {
    if (!history.location.search && page === 1) return
    if (page !== DOTS)
      pathname.includes('category')
        ? history.push(`${pathname}?page=${page}`)
        : history.push(`/?page=${page}`)
  }

  const switchToPrevPage = () => {
    if (posts.pageNumber > 1)
      pathname.includes('category')
        ? history.push(`${pathname}?page=${posts.pageNumber - 1}`)
        : history.push(`/?page=${posts.pageNumber - 1}`)
  }

  const switchToNextPage = () => {
    if (posts.pageNumber < posts.totalPages)
      pathname.includes('category')
        ? history.push(`${pathname}?page=${posts.pageNumber + 1}`)
        : history.push(`/?page=${posts.pageNumber + 1}`)
  }

  return (
    <nav className="pagination__wrapper">
      {pagination.map((page, index) => {
        if (page === PREV)
          return (
            <PaginationElement
              page={page}
              key={index}
              isActive={posts.pageNumber === page}
              changePage={switchToPrevPage}
            />
          )
        if (page === NEXT)
          return (
            <PaginationElement
              page={page}
              key={index}
              isActive={posts.pageNumber === page}
              changePage={switchToNextPage}
            />
          )

        return (
          <PaginationElement
            page={page}
            key={index}
            isActive={posts.pageNumber === page}
            changePage={switchToSpecificPage}
          />
        )
      })}
    </nav>
  )
}

export default PostsPagination
