import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { fetchSinglePost } from '../utils'
import Post from '../components/Post'
import PostBanner from './PostBanner'
import useParamsWithoutSlug from '../utils/customHooks/useParamsWithoutSlug'

const { REACT_APP_API_URL: API_URL } = process.env

const DisplayPost = () => {
  const [post, setPost] = useState(null)
  const { id, slug } = useParamsWithoutSlug()
  const history = useHistory()

  useEffect(() => {
    const fetchPost = async () => {
      const post = await fetchSinglePost(`${API_URL}/api/posts/`, id)
      setPost(post)

      if (!slug || slug !== post.slug) {
        history.replace(`/posts/${id}-${post.slug}`)
      }
    }
    fetchPost()
  }, [id])

  if (!post) {
    return <p>...loading...</p>
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
