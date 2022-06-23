import React from 'react'
import UserPosts from '../../components/UsersPosts'
import renderWithStore from '../../tests/utils/renderWithStore'
import {
  getAuthorPostsStatus,
  setPageDescription,
  setPageTitle,
} from '../../store/actions/actions'

describe('UserPosts component', () => {
  xit('should render properly', () => {
    const mockUser = jest.fn()

    mockUser.mockReturnValue({
      firstName: 'authorName',
      lastName: 'authorLastName',
    })

    renderWithStore(<UserPosts />, {
      actions: [
        getAuthorPostsStatus(mockUser.firstName),
        setPageTitle(),
        setPageDescription(),
      ],
      route: '/authors/authorName',
    })
  })
})
