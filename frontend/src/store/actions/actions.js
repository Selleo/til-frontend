import * as actionTypes from '../actionTypes'

import {
  fetchUser,
  fetchUserPosts,
  fetchData,
  fetchCategoryPosts,
  fetchSearchedPosts,
} from '../../utils'
import { statusType } from '../../utils/constants'

const { REACT_APP_API_URL: API_URL } = process.env

// CATEGORIES
const getAllCategories = categories => ({
  type: actionTypes.GET_ALL_CATEGORIES,
  categories,
})

export const saveAllCategories = () => async dispatch => {
  dispatch(setStatus({ key: 'categories', value: statusType.loading }))
  const categoriesArray = await fetchData(`${API_URL}/api/categories`)

  dispatch(getAllCategories(categoriesArray))
  dispatch(setStatus({ key: 'categories', value: statusType.fetched }))
}

// USER
const getCurrentUser = currentUser => ({
  type: actionTypes.GET_CURRENT_USER,
  currentUser,
})

export const saveCurrentUser = () => async dispatch => {
  dispatch(setStatus({ key: 'currentUser', value: statusType.loading }))
  let currentUser = await fetchUser(`${API_URL}/api/me`)

  if (currentUser.errors) {
    currentUser = false
  }

  dispatch(getCurrentUser(currentUser))
  dispatch(setStatus({ key: 'currentUser', value: statusType.fetched }))
}

export const deleteCurrentUser = () => ({
  type: actionTypes.DELETE_CURRENT_USER,
  currentUser: false,
})

export const logOut = () => dispatch => {
  dispatch(deleteCurrentUser())
  dispatch(saveAllPosts())
}

export const getCurrentUserPosts = currentUserPosts => ({
  type: actionTypes.GET_CURRENT_USER_POSTS,
  currentUserPosts,
})

export const saveCategoryPosts = id => async dispatch => {
  dispatch(setStatus({ key: 'categoryPosts', value: statusType.loading }))
  const categoryPosts = await fetchCategoryPosts(
    `${API_URL}/api/categories/${id}`
  )
  dispatch(getCategoryPosts(categoryPosts))
  dispatch(setStatus({ key: 'categoryPosts', value: statusType.fetched }))
}

export const getCategoryPosts = categoryPosts => ({
  type: actionTypes.GET_CATEGORY_POSTS,
  categoryPosts,
})

export const saveCurrentUserPosts = id => async dispatch => {
  const posts = await fetchUserPosts(`${API_URL}/api/users/`, id)

  dispatch(getCurrentUserPosts(posts))
}

// ALL USERS WITH STATS
const getAllUsers = users => ({
  type: actionTypes.GET_ALL_USERS,
  users,
})

export const saveAllUsers = () => async dispatch => {
  dispatch(setStatus({ key: 'users', value: statusType.loading }))

  const allUsers = await fetchData(`${API_URL}/api/statistics/users`)

  dispatch(getAllUsers(allUsers))
  dispatch(setStatus({ key: 'users', value: statusType.fetched }))
}

// POSTS
const getPosts = posts => ({
  type: actionTypes.GET_ALL_POSTS,
  posts,
})

export const saveAllPosts = () => async dispatch => {
  dispatch(setStatus({ key: 'posts', value: statusType.loading }))
  const allPosts = await fetchData(`${API_URL}/api/posts`)
  console.log(allPosts)

  dispatch(getPosts(allPosts))
  dispatch(setStatus({ key: 'posts', value: statusType.fetched }))
}

// SEARCHED POSTS

const getSerchedPosts = searchedPosts => ({
  type: actionTypes.GET_SEARCHED_POSTS,
  searchedPosts,
})

export const saveSearchedPosts = query => async dispatch => {
  dispatch(setStatus({ key: 'searchedPosts', value: statusType.loading }))
  const searchedPosts = await fetchSearchedPosts(query)

  dispatch(saveSearchedQuery(query))
  dispatch(getSerchedPosts(searchedPosts))
  dispatch(setStatus({ key: 'searchedPosts', value: statusType.fetched }))
}

export const saveSearchedQuery = searchQuery => ({
  type: actionTypes.SEARCH_QUERY,
  searchQuery,
})

const setStatus = ({ key, value }) => ({
  type: actionTypes.UPDATE_STATUS,
  payload: { key, value },
})
