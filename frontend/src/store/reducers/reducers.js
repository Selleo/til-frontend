import * as actionTypes from '../actionTypes'
import { statusType } from '../../utils/constants'

const initialState = {
  authorPostsStatus: '',
  categories: [],
  categoryPosts: null,
  currentUser: null,
  users: [],
  posts: null,
  searchedPosts: null,
  searchQuery: '',
  statuses: {},
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_CATEGORIES:
      return {
        ...state,
        categories: action.categories,
        statuses: {
          ...state.statuses,
          categories: statusType.fetched,
        },
      }

    case actionTypes.GET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.currentUser,
        statuses: {
          ...state.statuses,
          currentUser: statusType.fetched,
        },
      }

    case actionTypes.GET_CURRENT_USER_POSTS:
      return {
        ...state,
        currentUserPosts: action.currentUserPosts,
        statuses: {
          ...state.statuses,
          currentUserPosts: statusType.fetched,
        },
      }

    case actionTypes.DELETE_CURRENT_USER:
      return {
        ...state,
        currentUser: action.currentUser,
      }

    case actionTypes.GET_ALL_USERS:
      return {
        ...state,
        users: action.users,
        statuses: {
          ...state.statuses,
          users: statusType.fetched,
        },
      }

    case actionTypes.GET_ALL_POSTS:
      return {
        ...state,
        posts: action.posts,
        statuses: {
          ...state.statuses,
          posts: statusType.fetched,
        },
      }

    case actionTypes.GET_CATEGORY_POSTS:
      return {
        ...state,
        categoryPosts: action.categoryPosts,
        statuses: {
          ...state.statuses,
          categoryPosts: statusType.fetched,
        },
      }

    case actionTypes.GET_SEARCHED_POSTS:
      return {
        ...state,
        searchedPosts: action.searchedPosts,
        statuses: {
          ...state.statuses,
          searchedPosts: statusType.fetched,
        },
      }

    case actionTypes.SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.searchQuery,
      }

    case actionTypes.UPDATE_STATUS:
      return {
        ...state,
        statuses: {
          ...state.statuses,
          [action.payload.key]: action.payload.value,
        },
      }

    case actionTypes.GET_AUTHOR_POSTS_STATUS:
      return {
        ...state,
        statuses: {
          ...state.statuses,
          authorPostsStatus: statusType.fetched,
        },
      }

    default:
      return {
        ...state,
      }
  }
}

export default rootReducer
