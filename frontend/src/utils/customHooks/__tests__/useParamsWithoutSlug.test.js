import { renderHook } from '@testing-library/react-hooks'
import useParamsWithoutSlug from '../useParamsWithoutSlug'

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '',
      pathname: '',
      query: {
        postId: '12-test',
      },
      asPath: '/test',
    }
  },
}))
describe('useParamsWithoutSlug', () => {
  const expectedResult = {
    id: '12',
    slug: 'test',
  }
  it('should return id and rest of slug', () => {
    const { result } = renderHook(() => useParamsWithoutSlug())
    expect(result.current).toEqual(expectedResult)
  })
})
