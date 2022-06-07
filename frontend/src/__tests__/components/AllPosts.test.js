import renderWithStoreAndRouter from '../../tests/utils/renderWithStoreAndRouter'
import AllPosts from '../../components/AllPosts'
import React from 'react'
import { screen } from '@testing-library/react'
import nock from 'nock'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: '/posts',
    search: 'page',
  }),
}))

const postsMock = {
  data: [
    {
      id: 'test-2',
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
    },
    {
      id: 'test-3',
      slug: 'test-slug',
      createdAt: '2022-04-21T09:39:26',
      author: {
        userName: 'Tenteges',
      },
      body: 'testBody',
      reactions: [
        {
          post_id: 'test-id',
          type: 'like',
          user_uuid: '1',
        },
      ],
    },
    {
      id: 'test-5',
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
    },
    {
      id: 'test-4',
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
    },
  ],
  totalPages: 3,
}

describe('AllPosts', () => {
  it('should return "nothing found" if there is no posts', async () => {
    window.scrollTo = jest.fn()
    const state = { posts: [], statuses: { posts: 'fetched' } }

    renderWithStoreAndRouter(<AllPosts />, {
      initialState: state,
    })
    expect(await screen.findByText('Nothing found')).toBeInTheDocument()
  })

  xit('should return posts', async () => {
    // nock doesn't work as it should
    window.scrollTo = jest.fn()
    const state = { posts: postsMock, statuses: { posts: 'fetched' } }

    nock(`http://localhost:4000/`)
      .get('/api/posts?page=null')
      .reply(200, postsMock)

    renderWithStoreAndRouter(<AllPosts />, {
      initialState: state,
    })
    // expect
  })
})
