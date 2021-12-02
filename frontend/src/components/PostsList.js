import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { saveCategoryPosts } from '../store/actions/actions'
import { delayStep } from './Transition'
import Post from './Post'

import { statusType } from '../utils/constants'
import '../App.css'

const PostsList = ({ withCategory = false }) => {
  const categories = useSelector(state => state.categories)
  const categoryPosts = useSelector(state => state.categoryPosts?.posts)
  const posts = useSelector(state => state.posts)
  const categoriesStatus = useSelector(state => state.statuses.categoryPosts)
  const postStatus = useSelector(state => state.statuses.posts)

  const { id } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    if (withCategory) {
      const foundCategory = categories.find(({ name }) => name === id)
      foundCategory && dispatch(saveCategoryPosts(foundCategory.id))
    }
  }, [withCategory, categories, dispatch, id])

  if (!withCategory && postStatus !== statusType.fetched) return null
  if (!!withCategory && categoriesStatus !== statusType.fetched) return null

  let delay = 0

  return withCategory
    ? categoryPosts.data.map(post => {
        delay += delayStep

        return <Post key={post.id} post={post} animationDelay={delay} />
      })
    : posts.data.map(post => {
        delay += delayStep

        return <Post key={post.id} post={post} animationDelay={delay} />
      })
}

export default PostsList
