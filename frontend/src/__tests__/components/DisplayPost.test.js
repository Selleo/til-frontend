import { screen } from '@testing-library/react'

import DisplayPost from '../../components/DisplayPost'
import renderWithStore from '../../tests/utils/renderWithStore'

const mockReplace = jest.fn()
//
// jest.mock('react-router', () => {
//   return {
//     ...jest.requireActual('react-router'),
//     useHistory: () => ({ replace: mockReplace }),
//   }
// })
// TODO: fix this test
describe('DisplayPost', () => {
  xit('sets adds the post slug in url when entering post details without providing slug', async () => {
    const { history } = renderWithStore(<DisplayPost />, {
      route: `/posts/1`,
    })

    expect(history.location.pathname).toMatch('posts/1')

    expect(screen.getAllByTestId('post-skeleton')).toHaveLength(2)

    expect(await screen.findByText('Post Title')).toBeInTheDocument()

    expect(mockReplace).toHaveBeenCalledWith('/posts/1-post-slug')
  })

  xit('sets changes the post slug in url when user enters post details with invalid slug', async () => {
    const { history } = renderWithStore(<DisplayPost />, {
      route: `/posts/1-wrong-slug`,
    })

    expect(history.location.pathname).toMatch('posts/1')

    expect(screen.getAllByTestId('post-skeleton')).toHaveLength(2)

    expect(await screen.findByText('Post Title')).toBeInTheDocument()

    expect(mockReplace).toHaveBeenCalledWith('/posts/1-post-slug')
  })
})
