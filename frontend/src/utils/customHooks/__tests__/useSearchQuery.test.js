import { renderHook } from '@testing-library/react-hooks'
import { useSearchQuery } from '../useSearchQuery'
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '',
      pathname: '/search',
      query: {
        q: 'testQuery',
      },
      asPath: '',
    }
  },
}))

describe('useSearchQuery', () => {
  it('should ', () => {
    const { result } = renderHook(() => useSearchQuery())

    expect(result.current).toBe('testQuery')
  })
})
