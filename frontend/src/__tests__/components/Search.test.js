import React from 'react'
import { act, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import renderWithStoreAndRouter from '../../tests/utils/renderWithStoreAndRouter'

import { advanceBy } from 'jest-date-mock'
import Search from '../../components/Search'
import { createMemoryHistory } from 'history'

let mockDispatch
let history

beforeEach(() => {
  jest.useFakeTimers()
  mockDispatch = jest.fn()

  history = createMemoryHistory({
    initialEntries: ['/search'],
  })
})
afterEach(() => {
  jest.useRealTimers()
  jest.clearAllMocks()
})

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch,
}))

describe('Search', () => {
  it('should push query to URL param and clear input when click on clear button', async () => {
    renderWithStoreAndRouter(<Search />, history)

    const textInput = screen.getByPlaceholderText('Search')

    expect(history.location.pathname).toBe('/search')
    expect(history.location.search).toBe('')

    await act(async () => {
      await userEvent.type(textInput, 'Test_text')
      advanceBy(500 + 1000) // forward Date
      const cancelIcon = await screen.findByTitle('Clear')
      await userEvent.click(cancelIcon)
      jest.advanceTimersByTime(500) // forward setTimeout's timer
    })

    expect(history.location.pathname).toBe('/search')
    expect(history.location.search).toBe('?q=Test_text')

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'SEARCH_QUERY',
      searchQuery: '',
    })

    // TODO update JEST and add expectations
    // component unmounts after jest.advanceTimersByTime
    // expect(textInput.value).toBe('')
  })
})
