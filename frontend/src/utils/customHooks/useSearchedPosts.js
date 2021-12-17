import { useSelector } from 'react-redux'

export const useSearchedPosts = () =>
  useSelector(({ searchedPosts }) => searchedPosts?.data)
