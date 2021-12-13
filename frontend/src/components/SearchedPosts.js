import React from 'react'
import { useSelector } from 'react-redux'
import SearchedPhrase from './SearchedPhrase'
import PostsList from '../components/PostsList'
import NothingFound from './NothingFound'

const SearchedPosts = () => {
  const searchedPosts = useSelector(({ searchedPosts }) => searchedPosts?.data)
  const searchQuery = useSelector(({ searchQuery }) => searchQuery)

  if (!searchedPosts) {
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
