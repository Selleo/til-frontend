import React from 'react'
import Post from '../../components/Post'
import renderWithStoreAndRouter from '../../tests/utils/renderWithStoreAndRouter'
import { screen } from '@testing-library/react'

describe('Post', () => {
  const postMock = {
    id: 'test-id',
    slug: 'test-slug',
    createdAt: '2022-04-21T09:39:26',
    author: {
      userName: 'Tenteges',
    },
    reactions: [
      {
        post_id: 'test-id',
        type: 'like',
        user_uuid: '1',
      },
    ],
  }

  it('should render PostContent', () => {
    const { container } = renderWithStoreAndRouter(
      <Post review post={postMock} />,
      {
        route: '/search',
      }
    )
    expect(container).toMatchSnapshot()
  })

  it('should render PostContent as Link', () => {
    renderWithStoreAndRouter(<Post post={postMock} />)
    expect(screen.getAllByRole('link')[0].getAttribute('href')).toContain(
      '/posts/test-id-test-slug'
    )
  })
})
