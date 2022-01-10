import React from 'react'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import renderWithStoreAndRouter from '../../tests/utils/renderWithStoreAndRouter'

import Search from '../../components/Search'

const mockDispatch = jest.fn()
const mockPush = jest.fn()

jest.mock('react-router-dom', () => {
  return {
    ...jest.requireActual('react-router'),
    useHistory: () => ({ push: mockPush }),
  }
})

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch,
}))

describe('Search', () => {
  it('should call history.push and clear input when click on clear button', () => {
    renderWithStoreAndRouter(<Search />, ['/search'])

    const textInput = screen.getByPlaceholderText('Search')
    userEvent.type(textInput, 'Test_text')
    expect(textInput.value).toBe('Test_text')

    const cancelIcon = screen.getByTitle('Clear')
    userEvent.click(cancelIcon)

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'SEARCH_QUERY',
      searchQuery: '',
    })
    expect(textInput.value).toBe('')
    expect(mockPush).toHaveBeenCalledWith('/')
  })
})
