import { renderHook } from '@testing-library/react-hooks'
import { useOnRouteLeave } from '../useOnRouteLeave'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: '/test',
  }),
}))

describe('useOnRouteLeave', () => {
  it('should return true if route != current pathname', () => {
    const { result } = renderHook(() => useOnRouteLeave('/testTest'))
    expect(result.current).toBe(true)
  })
})
