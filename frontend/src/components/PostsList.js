import React, { useEffect } from 'react'
import Post from './Post'
import '../App.css'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { saveCategoryPosts } from '../store/actions/actions'
import { delayStep } from './Transition'

const PostsList = ({ withCategory = false }) => {
  const categories = useSelector(state => state.categories)
  const categoryPosts = useSelector(state => state.categoryPosts?.posts)
  const posts = useSelector(state => state.posts)

  const { id } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    if (withCategory) {
      const foundCategory = categories.find(({ name }) => name === id)
      foundCategory && dispatch(saveCategoryPosts(foundCategory.id))
    }
  }, [id, categories, dispatch, withCategory])

  let delay = 0

  if (!withCategory && !posts) return <div>loading</div>
  if (!!withCategory && !categoryPosts) return <div>loading</div>

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
