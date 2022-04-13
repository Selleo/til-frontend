import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { fetchSinglePost } from '../utils'
import Post from '../components/Post'
import PostBanner from './PostBanner'
import useParamsWithoutSlug from '../utils/customHooks/useParamsWithoutSlug'
import { useDispatch } from 'react-redux'
import { setPageDescription, setPageTitle } from '../store/actions/actions'
import PostSkeletonTemplate from './PostSkeletonTemplate'

const { REACT_APP_API_URL: API_URL } = process.env

const DisplayPost = () => {
  const [post, setPost] = useState(null)
  const { id, slug } = useParamsWithoutSlug()
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchPost = async () => {
      const post = await fetchSinglePost(`${API_URL}/api/posts/`, id)
      setPost(post)

      dispatch(setPageTitle(post?.title))
      dispatch(setPageDescription(post?.body))

      if (!slug || slug !== post.slug) {
        history.replace(`/posts/${id}-${post.slug}`)
      }
    }
    fetchPost()
  }, [id])

  useEffect(() => {
    return () => {
      dispatch(setPageTitle(null))
      dispatch(setPageDescription(null))
    }
  }, [])

  if (!post) {
    return <PostSkeletonTemplate />
  }

  if (post.errors) {
    return <p>post {post.errors.detail}</p>
  }

  return (
    <>
      <Post key={post.id} post={post} />
      <PostBanner postCategory={post.categories[0]} />
    </>
  )
}

export default DisplayPost
