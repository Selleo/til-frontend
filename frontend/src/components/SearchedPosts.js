import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import SearchedPhrase from './SearchedPhrase'
import PostsList from '../components/PostsList'
import NothingFound from './NothingFound'
import { saveSearchedPosts } from '../store/actions/actions'
import PostsPagination from './PostsPagination'

const SearchedPosts = () => {
  const searchedPosts = useSelector(state => state.searchedPosts)
  const searchQuery = useSelector(state => state.searchQuery)
  const dispatch = useDispatch()

  const savePosts = page => {
    dispatch(saveSearchedPosts(searchQuery, page))
  }

  if (!searchedPosts?.data.length) {
  useEffect(() => {
    dispatch(saveSearchedPosts(searchQuery))
  }, [searchQuery, dispatch])

  if (typeof posts === 'undefined' || !posts.length) {
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
