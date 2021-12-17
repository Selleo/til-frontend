import React from 'react'
import { useSelector } from 'react-redux'
import SearchedPhrase from './SearchedPhrase'
import PostsList from '../components/PostsList'
import NothingFound from './NothingFound'
import { useSearchedPosts } from '../utils/customHooks/useSearchedPosts'

const SearchedPosts = () => {
  const posts = useSearchedPosts()
  const searchQuery = useSelector(({ searchQuery }) => searchQuery)

  if (!posts) {
    return searchQuery && <NothingFound text={searchQuery} />
  }

  return (
    <>
      <SearchedPhrase phrase={searchQuery} />
      <PostsList posts={posts} />
    </>
  )
}

export default SearchedPosts
