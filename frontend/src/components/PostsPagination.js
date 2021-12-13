import React from 'react'
import { usePagination } from '../utils/customHooks/usePagination'
import PaginationElement from './PaginationElement'
import { saveAllPosts, saveCategoryPosts } from '../store/actions/actions'
import { useSelector, useDispatch } from 'react-redux'

const PostsPagination = ({ posts, withCategory = false }) => {
  const pagination = usePagination(posts)
  const pageNumber = useSelector(({ posts }) => posts.pageNumber)
  const category = useSelector(({ categoryPosts }) => categoryPosts)
  const dispatch = useDispatch()

  if (!posts.data.length) {
    return null
  }

  const handleClick = page => {
    if (withCategory) {
      switch (page) {
        case 'Prev':
          return dispatch(
            saveCategoryPosts(category.id, category.posts.pageNumber - 1)
          )
        case 'Next':
          return dispatch(
            saveCategoryPosts(category.id, category.posts.pageNumber + 1)
          )
        case '...':
          return
        default:
          return dispatch(saveCategoryPosts(category.id, page))
      }
    } else {
      switch (page) {
        case 'Prev':
          return dispatch(saveAllPosts(pageNumber - 1))
        case 'Next':
          return dispatch(saveAllPosts(pageNumber + 1))
        case '...':
          return
        default:
          return dispatch(saveAllPosts(page))
      }
    }
  }

  return (
    <nav className="pagination__wrapper">
      {pagination.map((page, index) => (
        <PaginationElement
          page={page}
          key={index}
          isActive={posts.pageNumber === page}
          handleClick={() => handleClick(page)}
        />
      ))}
    </nav>
  )
}

export default PostsPagination
