import React from 'react'
import { useSelector } from 'react-redux'
import PostsList from './PostsList'

const AllPosts = () => {
  const posts = useSelector(({ posts }) => posts?.data)

  if (!posts) {
    return null
  }

  return <PostsList posts={posts} />
}

export default AllPosts
