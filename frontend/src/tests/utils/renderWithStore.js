import { render } from '@testing-library/react'
import { Provider } from 'react-redux'

import rootReducer from '../../store/reducers/reducers'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'

const renderWithStore = (ui, { actions = [], initialState } = {}) => {
  const store = createStore(rootReducer, initialState, applyMiddleware(thunk))

  // actions.forEach(action => store.dispatch(action))

  const renderResult = render(<Provider store={store}>{ui}</Provider>)
  return {
    ...renderResult,
    store,
  }
}

export default renderWithStore
