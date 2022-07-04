import { renderHook } from '@testing-library/react-hooks'
import { useOnRouteLeave } from '../useOnRouteLeave'

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '',
      pathname: '',
      query: '',
      asPath: '/test',
    }
  },
}))

describe('useOnRouteLeave', () => {
  it('should return true if route != current pathname', () => {
    const { result } = renderHook(() => useOnRouteLeave('/testTest'))
    expect(result.current).toBe(true)
  })
})
