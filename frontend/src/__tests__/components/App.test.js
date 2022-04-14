import React from 'react'
import { render } from '@testing-library/react'
import App from '../../App'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../../store/reducers/reducers'
import { server } from '../../tests/test-server'

const store = createStore(rootReducer, compose(applyMiddleware(thunk)))

window.scrollTo = jest.fn()
beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }))

describe('<App/>', () => {
  it('renders properly', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <App />
      </Provider>
    )

    expect(getByTestId('app-main')).toBeInTheDocument()
  })
})
