import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createWrapper } from 'next-redux-wrapper'
import rootReducer from '../../src/store/reducers/reducers'

// initial states here
const initalState = {
  authorPostsStatus: '',
  categories: [],
  categoryPosts: null,
  currentUser: null,
  users: [],
  posts: null,
  searchedPosts: null,
  searchQuery: '',
  statuses: {},
  pageTitle: null,
  pageDescription: null,
}

// middleware
const middleware = [thunk]

// creating store
export const store = createStore(
  rootReducer,
  initalState,
  composeWithDevTools(applyMiddleware(...middleware))
)

// assigning store to next wrapper
const makeStore = () => store

export const wrapper = createWrapper(makeStore)
