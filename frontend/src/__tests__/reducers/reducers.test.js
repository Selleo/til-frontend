import * as actionTypes from '../../store/actionTypes'
import reducer from '../../store/reducers/reducers'

const initialState = {
  categories: [],
  categoryPosts: null,
  currentUser: null,
  users: [],
  posts: [],
  searchedPosts: [],
  searchQuery: [],
}

describe('reducers', () => {
  it('should return initialState', () => {
    expect(reducer(initialState, { type: 'noType' })).toEqual({
      categories: [],
      categoryPosts: null,
      currentUser: null,
      users: [],
      posts: [],
      searchedPosts: [],
      searchQuery: [],
    })
  })

  it('should handle GET_ALL_CATEGORIES', () => {
    expect(
      reducer(initialState, {
        type: actionTypes.GET_ALL_CATEGORIES,
        categories: [
          {
            id: 39,
            name: 'AAA',
          },
          {
            id: 2,
            name: 'android',
          },
        ],
        ...initialState,
      })
    ).toEqual({
      categories: [
        {
          id: 39,
          name: 'AAA',
        },
        {
          id: 2,
          name: 'android',
        },
      ],
      ...initialState,
    })
  })

  it('should handle GET_CURRENT_USER', () => {
    expect(
      reducer(
        {
          currentUser: {
            email: 'l.walczak@selleo.com',
            firstName: '?ukasz',
            image:
              'https://lh3.googleusercontent.com/a-/AOh14GhLi1F9PrSxR3X6o8EKAyLSyA9PKDANcsULJejp=s96-c',
            lastName: 'Walczak',
            posts: [
              {
                author: {
                  email: 'l.walczak@selleo.com',
                  firstName: '?ukasz',
                  image:
                    'https://lh3.googleusercontent.com/a-/AOh14GhLi1F9PrSxR3X6o8EKAyLSyA9PKDANcsULJejp=s96-c',
                  lastName: 'Walczak',
                  uuid: '2c63d9e6-f0c1-4e64-9356-887e44a906f4',
                },
                body: 'test',
                categories: ['test'],
                createdAt: '2020-10-19T15:01:52',
                id: 1,
                isPublic: false,
                reactionCount: null,
                reactions: [],
                reviewed: true,
                title: 'test',
              },
              {
                author: {
                  email: 'l.walczak@selleo.com',
                  firstName: '?ukasz',
                  image:
                    'https://lh3.googleusercontent.com/a-/AOh14GhLi1F9PrSxR3X6o8EKAyLSyA9PKDANcsULJejp=s96-c',
                  lastName: 'Walczak',
                  uuid: '2c63d9e6-f0c1-4e64-9356-887e44a906f4',
                },
                body: 'hello ',
                categories: ['angular', 'android'],
                createdAt: '2020-10-20T09:00:32',
                id: 4,
                isPublic: false,
                reactionCount: null,
                reactions: [],
                reviewed: true,
                title: 'ca?kiem nowy post',
              },
              {
                author: {
                  email: 'l.walczak@selleo.com',
                  firstName: '?ukasz',
                  image:
                    'https://lh3.googleusercontent.com/a-/AOh14GhLi1F9PrSxR3X6o8EKAyLSyA9PKDANcsULJejp=s96-c',
                  lastName: 'Walczak',
                  uuid: '2c63d9e6-f0c1-4e64-9356-887e44a906f4',
                },
                body: 'some sample',
                categories: ['new category'],
                createdAt: '2020-10-26T13:29:01',
                id: 6,
                isPublic: false,
                reactionCount: null,
                reactions: [],
                reviewed: true,
                title: 'some sample',
              },
              {
                author: {
                  email: 'l.walczak@selleo.com',
                  firstName: '?ukasz',
                  image:
                    'https://lh3.googleusercontent.com/a-/AOh14GhLi1F9PrSxR3X6o8EKAyLSyA9PKDANcsULJejp=s96-c',
                  lastName: 'Walczak',
                  uuid: '2c63d9e6-f0c1-4e64-9356-887e44a906f4',
                },
                body: 'some some',
                categories: ['AAA'],
                createdAt: '2020-10-26T13:46:27',
                id: 7,
                isPublic: false,
                reactionCount: null,
                reactions: [],
                reviewed: true,
                title: 'category test',
              },
            ],
            uuid: '2c63d9e6-f0c1-4e64-9356-887e44a906f4',
          },
          ...initialState,
        },
        actionTypes.GET_CURRENT_USER
      )
    ).toEqual({
      currentUser: {
        email: 'l.walczak@selleo.com',
        firstName: '?ukasz',
        image:
          'https://lh3.googleusercontent.com/a-/AOh14GhLi1F9PrSxR3X6o8EKAyLSyA9PKDANcsULJejp=s96-c',
        lastName: 'Walczak',
        posts: [
          {
            author: {
              email: 'l.walczak@selleo.com',
              firstName: '?ukasz',
              image:
                'https://lh3.googleusercontent.com/a-/AOh14GhLi1F9PrSxR3X6o8EKAyLSyA9PKDANcsULJejp=s96-c',
              lastName: 'Walczak',
              uuid: '2c63d9e6-f0c1-4e64-9356-887e44a906f4',
            },
            body: 'test',
            categories: ['test'],
            createdAt: '2020-10-19T15:01:52',
            id: 1,
            isPublic: false,
            reactionCount: null,
            reactions: [],
            reviewed: true,
            title: 'test',
          },
          {
            author: {
              email: 'l.walczak@selleo.com',
              firstName: '?ukasz',
              image:
                'https://lh3.googleusercontent.com/a-/AOh14GhLi1F9PrSxR3X6o8EKAyLSyA9PKDANcsULJejp=s96-c',
              lastName: 'Walczak',
              uuid: '2c63d9e6-f0c1-4e64-9356-887e44a906f4',
            },
            body: 'hello ',
            categories: ['angular', 'android'],
            createdAt: '2020-10-20T09:00:32',
            id: 4,
            isPublic: false,
            reactionCount: null,
            reactions: [],
            reviewed: true,
            title: 'ca?kiem nowy post',
          },
          {
            author: {
              email: 'l.walczak@selleo.com',
              firstName: '?ukasz',
              image:
                'https://lh3.googleusercontent.com/a-/AOh14GhLi1F9PrSxR3X6o8EKAyLSyA9PKDANcsULJejp=s96-c',
              lastName: 'Walczak',
              uuid: '2c63d9e6-f0c1-4e64-9356-887e44a906f4',
            },
            body: 'some sample',
            categories: ['new category'],
            createdAt: '2020-10-26T13:29:01',
            id: 6,
            isPublic: false,
            reactionCount: null,
            reactions: [],
            reviewed: true,
            title: 'some sample',
          },
          {
            author: {
              email: 'l.walczak@selleo.com',
              firstName: '?ukasz',
              image:
                'https://lh3.googleusercontent.com/a-/AOh14GhLi1F9PrSxR3X6o8EKAyLSyA9PKDANcsULJejp=s96-c',
              lastName: 'Walczak',
              uuid: '2c63d9e6-f0c1-4e64-9356-887e44a906f4',
            },
            body: 'some some',
            categories: ['AAA'],
            createdAt: '2020-10-26T13:46:27',
            id: 7,
            isPublic: false,
            reactionCount: null,
            reactions: [],
            reviewed: true,
            title: 'category test',
          },
        ],
        uuid: '2c63d9e6-f0c1-4e64-9356-887e44a906f4',
      },
      ...initialState,
    })
  })
})
