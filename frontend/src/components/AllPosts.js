import React from 'react'
import PostsList from './PostsList'
import { usePosts } from '../utils/customHooks/usePosts'
import PostSkeletonTemplate from './PostSkeletonTemplate'

const AllPosts = () => {
  const posts = usePosts()

  if (!posts) {
    return <PostSkeletonTemplate />
  }

  return <PostsList posts={posts} />
}

export default AllPosts
