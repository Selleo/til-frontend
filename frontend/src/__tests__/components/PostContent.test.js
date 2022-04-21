import React from 'react'
import { prettyDOM, render, screen } from '@testing-library/react'
import PostContent from '../../components/PostContent'
import renderWithStoreAndRouter from '../../tests/utils/renderWithStoreAndRouter'

describe('PostContent', () => {
  const postMock = {
    id: 'test-id',
    isPulic: true,
    slug: 'test-slug',
    createdAt: '2022-04-21T09:39:26',
    author: {
      userName: 'Tenteges',
      firstName: 'Tenteges',
      lastName: 'Wihajster',
      image: 'http://placekitten.com/200/',
    },
    reactions: [
      {
        post_id: 'test-id',
        type: 'like',
        user_uuid: '1',
      },
    ],
  }

  it('should render properly', () => {
    const { container } = renderWithStoreAndRouter(
      <PostContent post={postMock} />,
      { route: '/search' }
    )
    expect(container).toMatchSnapshot()
  })

  it('should render with userMenu', () => {
    renderWithStoreAndRouter(<PostContent post={postMock} userMenu />, {
      route: '/search',
    })
    expect(screen.getByText('Edit')).toBeInTheDocument()
    expect(screen.getByText('Delete')).toBeInTheDocument()
  })
})
