import { useSelector } from 'react-redux'

export const useCategoryPosts = () =>
  useSelector(({ categoryPosts }) => categoryPosts?.posts)
