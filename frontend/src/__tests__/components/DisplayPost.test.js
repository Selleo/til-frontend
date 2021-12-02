import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { Router, Switch, Route } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import DisplayPost from '../../components/DisplayPost'

const mockReplace = jest.fn()

jest.mock('react-router', () => {
  return {
    ...jest.requireActual('react-router'),
    useHistory: () => ({ replace: mockReplace }),
  }
})

const renderTestComponent = (component, { route = '/' } = {}) => {
  const history = createMemoryHistory([route])
  history.push(route)

  const store = configureStore()({})
  return {
    ...render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route path="/posts/:id">{component}</Route>
          </Switch>
        </Router>
      </Provider>
    ),
    history,
  }
}

describe('DisplayPost', () => {
  it('sets adds the post slug in url when entering post details without providing slug', async () => {
    const { history } = renderTestComponent(<DisplayPost />, {
      route: `/posts/1`,
    })

    expect(history.location.pathname).toMatch('posts/1')

    const loading = screen.getByText('...loading...')

    expect(loading).toBeInTheDocument()

    expect(await screen.findByText('Post Title')).toBeInTheDocument()

    expect(mockReplace).toHaveBeenCalledWith('/posts/1-post-slug')
  })

  it('sets changes the post slug in url when user enters post details with invalid slug', async () => {
    const { history } = renderTestComponent(<DisplayPost />, {
      route: `/posts/1-wrong-slug`,
    })

    expect(history.location.pathname).toMatch('posts/1')

    const loading = screen.getByText('...loading...')

    expect(loading).toBeInTheDocument()

    expect(await screen.findByText('Post Title')).toBeInTheDocument()

    expect(mockReplace).toHaveBeenCalledWith('/posts/1-post-slug')
  })
})
