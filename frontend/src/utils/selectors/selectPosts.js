import { createSelector } from 'reselect'

const selectPosts = ({ posts }) => posts
const selectPostsStatus = state => state.statuses.posts

export const selectPostsWithStatus = createSelector(
  selectPosts,
  selectPostsStatus,
  (posts, status) => [posts, status]
)
