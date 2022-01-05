import React from 'react'
import { useSelector } from 'react-redux'
import SearchedPhrase from './SearchedPhrase'
import PostsList from '../components/PostsList'
import NothingFound from './NothingFound'
import { useSearchedPosts } from '../utils/customHooks/useSearchedPosts'
import PostSkeletonTemplate from './PostSkeletonTemplate'

const SearchedPosts = () => {
  const posts = useSearchedPosts()
  const searchQuery = useSelector(({ searchQuery }) => searchQuery)

  if (!posts) {
    if (searchQuery) {
      return <NothingFound text={searchQuery} />
    } else {
      return <PostSkeletonTemplate />
    }
  }

  return (
    <>
      <SearchedPhrase phrase={searchQuery} />
      <PostsList posts={posts} />
    </>
  )
}

export default SearchedPosts
