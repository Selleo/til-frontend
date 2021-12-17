import { useSelector } from 'react-redux'

const ALL_POSTS = 'post'
const CATEGORY_POSTS = 'category'
const SEARCHED_POSTS = 'searched'

export const usePosts = (type = 'post') => {
  const posts = useSelector(({ posts }) => posts?.data)
  const category = useSelector(({ categoryPosts }) => categoryPosts?.posts.data)
  const search = useSelector(({ searchedPosts }) => searchedPosts?.data)

  switch (type) {
    case ALL_POSTS:
      return posts
    case CATEGORY_POSTS:
      return category
    case SEARCHED_POSTS:
      return search
    default:
      return posts
  }
}
