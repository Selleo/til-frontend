import { createSelector } from 'reselect'

const selectSearchedPosts = state => state.searchedPosts
const selectSearchedPostsStatus = state => state.statuses.searchedPosts

export const selectSearchedPostsWithStatus = createSelector(
  selectSearchedPosts,
  selectSearchedPostsStatus,
  (searchedPosts, status) => [searchedPosts, status]
)
