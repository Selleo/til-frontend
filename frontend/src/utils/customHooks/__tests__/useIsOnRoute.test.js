import { useIsOnRoute } from '../useIsOnRoute'
import { renderHook } from '@testing-library/react-hooks'
import { useDisableOnRoute } from '../useDisableOnRoute'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: '/test',
  }),
}))

describe('useIsOnRoute', () => {
  it('should return true', () => {
    const { result } = renderHook(() => useIsOnRoute(['/test']))
    expect(result.current).toBe(true)
  })

  it('should return false', () => {
    const { result } = renderHook(() => useDisableOnRoute(['/tset']))
    expect(result.current.isDisabled).toBe(false)
  })
})
