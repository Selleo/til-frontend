import React from 'react'
import renderWithStoreAndRouter from '../../tests/utils/renderWithStoreAndRouter'
import PostsList from '../../components/PostsList'

describe('PostList', () => {
  const postsMock = [
    {
      author: {
        email: 'test@selleo.com',
        firstName: 'TestName',
        image: 'http://placekitten.com/200/',
        lastName: 'TestLastName',
        userName: 'TestNameLastName',
        uuid: '1',
      },
      body: 'Test',
      categories: [
        {
          firstText: null,
          id: 1,
          name: 'test-category',
          position: 1,
          secondText: null,
          url: null,
        },
      ],
      createdAt: '2022-01-28T13:16:09',
      id: 420,
      isPublic: false,
      reactionCount: 2,
      reactions: [
        {
          post_id: 420,
          type: 'like',
          user_uuid: '2',
        },
        {
          post_id: 420,
          type: 'funny',
          user_uuid: '3',
        },
      ],
      reviewed: true,
      slug: 'test-slug',
      title: 'test-title',
    },
    {
      author: {
        email: 'test2@selleo.com',
        firstName: 'TestName2',
        image: 'http://placekitten.com/200/',
        lastName: 'TestLastName',
        userName: 'TestNameLastName',
        uuid: '2',
      },
      body: 'Test2',
      categories: [
        {
          firstText: null,
          id: 2,
          name: 'test-category',
          position: 2,
          secondText: null,
          url: null,
        },
      ],
      createdAt: '2022-01-28T13:16:09',
      id: 421,
      isPublic: false,
      reactionCount: 2,
      reactions: [
        {
          post_id: 421,
          type: 'like',
          user_uuid: '2',
        },
        ,
      ],
      reviewed: true,
      slug: 'test-slug',
      title: 'test-title',
    },
  ]

  it('should render', () => {
    const { container } = renderWithStoreAndRouter(
      <PostsList posts={postsMock} />,
      { route: '/category/test-category' }
    )
    expect(container).toMatchSnapshot()
  })
})
