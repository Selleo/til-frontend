import React from 'react'
import UserPosts from '../../components/UsersPosts'
import renderWithStoreAndRouter from '../../tests/utils/renderWithStoreAndRouter'
import {
  getAuthorPostsStatus,
  setPageDescription,
  setPageTitle,
} from '../../store/actions/actions'
import fetch from 'jest-mock-fetch'
import { prettyDOM } from '@testing-library/react'

afterEach(() => {
  fetch.reset()
})

describe('UserPosts component', () => {
  xit('should render properly', () => {
    const mockUser = jest.fn()

    mockUser.mockReturnValue({
      firstName: 'authorName',
      lastName: 'authorLastName',
    })

    const { container } = renderWithStoreAndRouter(<UserPosts />, {
      actions: [
        getAuthorPostsStatus(mockUser.firstName),
        setPageTitle(),
        setPageDescription(),
      ],
      route: '/authors/authorName',
    })
    console.log(prettyDOM(container))
  })
})
