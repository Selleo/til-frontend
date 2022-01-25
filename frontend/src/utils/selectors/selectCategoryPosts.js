import { createSelector } from 'reselect'

const selectCategoryPosts = ({ categoryPosts }) => categoryPosts?.posts
const selectCategoryPostsStatus = state => state.statuses.categoryPosts

export const selectCategoryPostsWithStatus = createSelector(
  selectCategoryPosts,
  selectCategoryPostsStatus,
  (posts, status) => [posts, status]
)
