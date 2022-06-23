import { useIsOnRoute } from '../useIsOnRoute'
import { renderHook } from '@testing-library/react-hooks'
import { useDisableOnRoute } from '../useDisableOnRoute'

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '',
      pathname: '',
      query: {},
      asPath: '/test',
    }
  },
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
