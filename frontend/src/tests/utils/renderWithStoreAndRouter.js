import configureStore from 'redux-mock-store'
import { createMemoryHistory } from 'history'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { Route, Router, Switch } from 'react-router-dom'
import React from 'react'

const renderWithStoreAndRouter = (
  component,
  history = createMemoryHistory({
    initialEntries: ['/'],
  })
) => {
  const middlewares = []
  const mockStore = configureStore(middlewares)
  const store = mockStore({})

  return render(
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route path={history.location.pathname}>{component}</Route>
        </Switch>
      </Router>
    </Provider>
  )
}

export default renderWithStoreAndRouter
