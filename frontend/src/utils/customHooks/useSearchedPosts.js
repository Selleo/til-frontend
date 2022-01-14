import { useSelector } from 'react-redux'

export const useSearchedPosts = () => useSelector(state => state.searchedPosts)
