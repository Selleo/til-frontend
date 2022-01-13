import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import SearchedPhrase from './SearchedPhrase'
import { isEmpty } from 'lodash'
import PostsList from '../components/PostsList'
import NothingFound from './NothingFound'
import { saveSearchedPosts } from '../store/actions/actions'
import PostsPagination from './PostsPagination'
import { useSearchedPosts } from '../utils/customHooks/useSearchedPosts'
import { useSearchQuery } from '../utils/customHooks/useSearchQuery'

const SearchedPosts = () => {
  const searchedPosts = useSearchedPosts()
  const searchQuery = useSearchQuery()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(saveSearchedPosts(searchQuery))
  }, [searchQuery, dispatch])

  const savePosts = page => {
    dispatch(saveSearchedPosts(searchQuery, page))
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
