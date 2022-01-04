import React from 'react'
import { usePagination } from '../utils/customHooks/usePagination'
import PaginationElement from './PaginationElement'

const PostsPagination = ({ posts, savePosts }) => {
  const pagination = usePagination(posts)

  if (!posts.data.length) {
    return null
  }

  const handleClick = page => {
    switch (page) {
      case 'Prev':
        return savePosts(posts.pageNumber - 1)
      case 'Next':
        return savePosts(posts.pageNumber + 1)
      case '...':
        return
      default:
        return savePosts(page)
    }
  }

  return (
    <nav className="pagination__wrapper">
      {pagination.map((page, index) => (
        <PaginationElement
          page={page}
          key={index}
          isActive={posts.pageNumber === page}
          changePage={handleClick}
        />
      ))}
    </nav>
  )
}

export default PostsPagination
