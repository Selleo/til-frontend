import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import PostsList from './PostsList'
import { saveCategoryPosts } from '../store/actions/actions'
import { useCategoryPosts } from '../utils/customHooks/useCategoryPosts'
import PostSkeletonTemplate from './PostSkeletonTemplate'

const CategoryPosts = () => {
  const posts = useCategoryPosts()
  const categories = useSelector(state => state.categories)

  const dispatch = useDispatch()
  const { id } = useParams()

  useEffect(() => {
    const foundCategory = categories.find(({ name }) => name === id)
    foundCategory && dispatch(saveCategoryPosts(foundCategory.id))
  }, [categories, dispatch, id])

  if (!posts) {
    return <PostSkeletonTemplate />
  }

  return <PostsList posts={posts} />
}

export default CategoryPosts
