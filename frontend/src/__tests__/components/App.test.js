import React from 'react'
import { render } from '@testing-library/react'
import App from '../../App'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../../store/reducers/reducers'

const store = createStore(rootReducer, compose(applyMiddleware(thunk)))

window.scrollTo = jest.fn()

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
