import { prettyDOM, render } from '@testing-library/react'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../../store/reducers/reducers'
import AllPosts from '../../components/AllPosts'

const store = createStore(rootReducer, compose(applyMiddleware(thunk)))

window.scrollTo = jest.fn()
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '/',
      query: '',
      asPath: '/',
    }
  },
}))

describe('index page ', () => {
  xit('should properly render skeleton', async () => {
    const { container } = render(
      <Provider store={store}>
        <AllPosts />
      </Provider>
    )

    expect(container).toBeInTheDocument()
  })
})
