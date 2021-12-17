import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import PostsList from './PostsList'
import { saveCategoryPosts } from '../store/actions/actions'
import { usePosts } from '../utils/customHooks/usePosts'

const CategoryPosts = () => {
  const posts = usePosts('category')
  const categories = useSelector(state => state.categories)

  const dispatch = useDispatch()
  const { id } = useParams()

  useEffect(() => {
    const foundCategory = categories.find(({ name }) => name === id)
    foundCategory && dispatch(saveCategoryPosts(foundCategory.id))
  }, [categories, dispatch, id])

  if (!posts) {
    return null
  }

  return <PostsList posts={posts} />
}

export default CategoryPosts
