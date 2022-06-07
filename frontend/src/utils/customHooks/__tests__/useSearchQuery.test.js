import { renderHook } from '@testing-library/react-hooks'
import { useSearchQuery } from '../useSearchQuery'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: '/test',
    search: '?q=testQuery',
  }),
}))

describe('useSearchQuery', () => {
  it('should ', () => {
    const { result } = renderHook(() => useSearchQuery())
    expect(result.current).toBe('testQuery')
  })
})
