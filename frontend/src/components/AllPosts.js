import React from 'react'
import { useDispatch } from 'react-redux'
import PostsList from './PostsList'
import { usePosts } from '../utils/customHooks/usePosts'
import PostsPagination from './PostsPagination'
import { saveAllPosts } from '../store/actions/actions'

const AllPosts = () => {
  const posts = usePosts()
  const dispatch = useDispatch()

  const savePosts = (page = null) => {
    dispatch(saveAllPosts(page))
  }

  if (!posts) {
    return null
  }

  return (
    <>
      <PostsList posts={posts.data} />
      <PostsPagination posts={posts} savePosts={savePosts} />
    </>
  )
}

export default AllPosts
