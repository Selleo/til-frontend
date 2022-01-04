import { useSelector } from 'react-redux'

export const usePosts = () => useSelector(({ posts }) => posts)
