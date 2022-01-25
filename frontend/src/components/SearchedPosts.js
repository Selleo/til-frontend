import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SearchedPhrase from './SearchedPhrase'
import { isEmpty } from 'lodash'
import PostsList from '../components/PostsList'
import NothingFound from './NothingFound'
import { saveSearchedPosts } from '../store/actions/actions'
import PostsPagination from './PostsPagination'
import { selectSearchedPostsWithStatus } from '../utils/selectors/selectSearchedPosts'
import PostSkeletonTemplate from './PostSkeletonTemplate'
import { useSearchQuery } from '../utils/customHooks/useSearchQuery'
import { statusType } from '../utils/constants'

const SearchedPosts = () => {
  const [searchedPosts, status] = useSelector(selectSearchedPostsWithStatus)
  const searchQuery = useSearchQuery()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(saveSearchedPosts(searchQuery))
  }, [searchQuery, dispatch])

  const savePosts = page => {
    dispatch(saveSearchedPosts(searchQuery, page))
  }

  if (status === statusType.loading) {
    return <PostSkeletonTemplate />
  }

  if (isEmpty(searchedPosts?.data)) {
    return searchQuery && <NothingFound text={searchQuery} />
  }

  return (
    <>
      <SearchedPhrase phrase={searchQuery} />
      <PostsList posts={searchedPosts.data} />
      <PostsPagination posts={searchedPosts} savePosts={savePosts} />
    </>
  )
}

export default SearchedPosts
