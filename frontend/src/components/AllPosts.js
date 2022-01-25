import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isEmpty } from 'lodash'
import PostsList from './PostsList'
import { selectPostsWithStatus } from '../utils/selectors/selectPosts'
import PostSkeletonTemplate from './PostSkeletonTemplate'
import PostsPagination from './PostsPagination'
import { saveAllPosts } from '../store/actions/actions'
import { statusType } from '../utils/constants'
import NothingFound from './NothingFound'

const AllPosts = () => {
  const [posts, status] = useSelector(selectPostsWithStatus)
  const dispatch = useDispatch()

  const savePosts = (page = null) => {
    dispatch(saveAllPosts(page))
  }

  if (!status || status === statusType.loading) {
    return <PostSkeletonTemplate />
  }

  if (isEmpty(posts?.data)) {
    return <NothingFound />
  }

  return (
    <>
      <PostsList posts={posts.data} />
      <PostsPagination posts={posts} savePosts={savePosts} />
    </>
  )
}

export default AllPosts
