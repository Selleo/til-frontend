import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
// import { useLocation } from 'react-router-dom'
import { useRouter } from 'next/router'
import { isEmpty } from 'lodash'

// import { saveAllPosts } from '../store/actions/actions'
import { saveAllPosts } from '../store/actions/actions'
import { selectPostsWithStatus } from '../utils/selectors/selectPosts'
import { statusType } from '../utils/constants'

import NothingFound from './NothingFound'
import PostsList from './PostsList'
import PostsPagination from './PostsPagination'
import PostSkeletonTemplate from './PostSkeletonTemplate'

const AllPosts = () => {
  const router = useRouter()
  // const { search } = useLocation()
  const dispatch = useDispatch()

  let searchParams = router.query.page

  const [posts, status] = useSelector(selectPostsWithStatus)

  useEffect(() => {
    dispatch(saveAllPosts(searchParams))
  }, [dispatch, searchParams])

  if (!status || status === statusType.loading) {
    return <PostSkeletonTemplate />
  }
  if (isEmpty(posts?.data)) {
    return <NothingFound />
  }

  return (
    <>
      <PostsList posts={posts.data} />
      <PostsPagination posts={posts} />
    </>
  )
}

export default AllPosts
