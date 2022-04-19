import { createMemoryHistory } from 'history'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { Router, Route } from 'react-router-dom'
import React from 'react'
import rootReducer from '../../store/reducers/reducers'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'

export const renderWithStoreAndRouter = (
  ui,
  { actions = [], route = '/' } = {}
) => {
  const store = createStore(rootReducer, applyMiddleware(thunk))
  actions.forEach(action => store.dispatch(action))
  const history = createMemoryHistory({
    initialEntries: [route],
  })
  const renderResult = render(
    <Router history={history}>
      <Provider store={store}>{ui}</Provider>
    </Router>
  )
  return {
    ...renderResult,
    store,
    history,
  }
}

export default renderWithStoreAndRouter
