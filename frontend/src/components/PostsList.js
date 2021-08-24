import React from 'react'
import Post from './Post'
import '../App.css'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { saveCategoryPosts } from '../store/actions/actions'
import { delayStep } from './Transition'

const PostsList = props => {
  const { posts } = props
  const categories = useSelector(state => state.categories)
  const { id } = useParams()
  const dispatch = useDispatch()

  if (!posts) {
    const foundCategory = categories.find(({ name }) => name === id)
    if (foundCategory) {
      dispatch(saveCategoryPosts(foundCategory.id))
    }

    return null
  }

  let delay = 0

  return posts.map(post => {
    delay += delayStep

    return <Post key={post.id} post={post} animationDelay={delay} />
  })
}

export default PostsList
