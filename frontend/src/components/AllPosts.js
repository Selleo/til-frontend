import React from 'react'
import PostsList from './PostsList'
import { usePosts } from '../utils/customHooks/usePosts'

const AllPosts = () => {
  const posts = usePosts()

  if (!posts) {
    return null
  }

  return <PostsList posts={posts} />
}

export default AllPosts
