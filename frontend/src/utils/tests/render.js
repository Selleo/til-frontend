import React from 'react'
import { render } from '@testing-library/react'
import App from '../../App'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

export const renderWithRedux = (Component, initialState) => {
  const middlewares = [thunk]
  const mockStore = configureStore(middlewares)
  const store = mockStore(initialState)

  const utils = render(
    <Provider store={store}>
      <Component />
    </Provider>
  )

  return { ...utils }
}

export const renderWithReduxAndRouter = (Component, initialState) => {
  const middlewares = [thunk]
  const mockStore = configureStore(middlewares)
  const store = mockStore(initialState)

  const utils = render(
    <Provider store={store}>
      <Router>
        <Component />
      </Router>
    </Provider>
  )

  return { ...utils }
}
