import renderWithStoreAndRouter from '../../tests/utils/renderWithStoreAndRouter'
import AllPosts from '../../components/AllPosts'
import React from 'react'
import * as reactRedux from 'react-redux'

beforeEach(() => {
  useSelectorMock.mockClear()
})

const useSelectorMock = jest.spyOn(reactRedux, 'useSelector')

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: '/',
    search: 'page',
  }),
}))

describe('AllPosts', () => {
  xit('should ', () => {
    useSelectorMock.mockReturnValue(['fetched'])

    renderWithStoreAndRouter(<AllPosts />, {})
  })
})
