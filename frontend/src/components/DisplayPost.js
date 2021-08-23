import React, { useState, useEffect } from 'react'
import { fetchSinglePost } from '../utils'
import { useParams } from 'react-router-dom'
import Post from '../components/Post'
import PostBanner from './PostBanner'

const { REACT_APP_API_URL: API_URL } = process.env

const DisplayPost = () => {
  const [post, setPost] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    const fetchPost = async () => {
      const post = await fetchSinglePost(`${API_URL}/api/posts/`, id)
      setPost(post)
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
