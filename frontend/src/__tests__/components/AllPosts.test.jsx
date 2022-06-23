import renderWithStore from '../../tests/utils/renderWithStore'
import AllPosts from '../../components/AllPosts'

import { screen } from '@testing-library/react'

import nock from 'nock'

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]),
  })
)
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/posts',
      pathname: '',
      query: '',
      asPath: '',
    }
  },
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

//TODO: MOCK DATA
describe('AllPosts', () => {
  it.only('should return "nothing found" if there is no posts', async () => {
    window.scrollTo = jest.fn()

    nock(`http://localhost:4000/`).get('/api/posts?page=null').reply(200, [])

    renderWithStore(<AllPosts />)

    expect(await screen.findByText('Nothing found')).toBeInTheDocument()
  })

  it('should return posts', async () => {
    // nock doesn't work as it should
    window.scrollTo = jest.fn()
    const state = { posts: postsMock, statuses: { posts: 'fetched' } }

    nock(`http://localhost:4000/`)
      .get('/api/posts?page=null')
      .reply(200, postsMock)

    renderWithStore(<AllPosts />, {
      initialState: state,
    })
    // expect
  })
})
