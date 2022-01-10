import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import PostsList from './PostsList'
import { saveCategoryPosts } from '../store/actions/actions'
import { useCategoryPosts } from '../utils/customHooks/useCategoryPosts'
import PostsPagination from './PostsPagination'

const CategoryPosts = () => {
  const posts = useCategoryPosts()
  const categories = useSelector(state => state.categories)

  const dispatch = useDispatch()
  const { id } = useParams()

  const savePosts = (page = null) => {
    const foundCategory = categories.find(({ name }) => name === id)
    foundCategory && dispatch(saveCategoryPosts(foundCategory.id, page))
  }

  useEffect(() => {
    savePosts()
  }, [categories, dispatch, id])

  if (!posts) {
    return null
  }

  return (
    <>
      <PostsList posts={posts.data} />
      <PostsPagination posts={posts} savePosts={savePosts} />
    </>
  )
}

export default CategoryPosts
