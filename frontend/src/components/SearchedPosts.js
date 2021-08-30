import React from 'react'
import { useSelector } from 'react-redux'
import SearchedPhrase from './SearchedPhrase'
import PostsList from '../components/PostsList'
import NothingFound from './NothingFound'
import { useHistory } from 'react-router-dom'

const SearchedPosts = () => {
  const searchedPosts = useSelector(state => state.searchedPosts)
  const searchQuery = useSelector(state => state.searchQuery)
  const history = useHistory()

  if (searchQuery.length < 0) {
    history.push('/')
  }

  if (!searchedPosts.length) {
    return searchQuery && <NothingFound text={searchQuery} />
  }

  return (
    <>
      <SearchedPhrase phrase={searchQuery} />
      <PostsList posts={searchedPosts} />
    </>
  )
}

export default SearchedPosts
