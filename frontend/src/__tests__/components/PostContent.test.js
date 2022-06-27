import { screen } from '@testing-library/react'
import PostContent from '../../components/PostContent'
import renderWithStore from '../../tests/utils/renderWithStore'
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
    }
  },
}))
describe('PostContent', () => {
  const postMock = {
    id: 1,
    isPublic: true,
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
        post_id: 1,
        type: 'like',
        user_uuid: '1',
      },
    ],
  }

  it('should render properly', () => {
    const { container } = renderWithStore(<PostContent post={postMock} />)
    expect(container).toMatchSnapshot()
  })

  it('should render with userMenu', () => {
    renderWithStore(<PostContent post={postMock} userMenu />, {
      route: '/',
    })
    expect(screen.getByText('Edit')).toBeInTheDocument()
    expect(screen.getByText('Delete')).toBeInTheDocument()
  })
})
