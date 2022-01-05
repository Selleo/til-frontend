import React from 'react'
import { usePagination } from '../utils/customHooks/usePagination'
import PaginationElement from './PaginationElement'

const PostsPagination = ({ posts, savePosts }) => {
  const { pagination, PREV, NEXT, DOTS } = usePagination(posts)

  if (!posts.data.length) {
    return null
  }

  const handleClick = page => {
    if (page !== DOTS) {
      savePosts(page)
    }
  }

  const handleMoveLeft = () => {
    if (posts.pageNumber > 1) {
      savePosts(posts.pageNumber - 1)
    }
  }

  const handleMoveRight = () => {
    if (posts.pageNumber < posts.totalPages) {
      savePosts(posts.pageNumber + 1)
    }
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
              changePage={handleMoveLeft}
            />
          )
        if (page === NEXT)
          return (
            <PaginationElement
              page={page}
              key={index}
              isActive={posts.pageNumber === page}
              changePage={handleMoveRight}
            />
          )

        return (
          <PaginationElement
            page={page}
            key={index}
            isActive={posts.pageNumber === page}
            changePage={handleClick}
          />
        )
      })}
    </nav>
  )
}

export default PostsPagination
