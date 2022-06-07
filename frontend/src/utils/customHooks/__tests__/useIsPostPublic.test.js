import { renderHook } from '@testing-library/react-hooks'
import { useIsPostPublic } from '../useIsPostPublic'
import * as reactRedux from 'react-redux'

describe('useIsPostPublic', () => {
  beforeEach(() => {
    useSelectorMock.mockClear()
  })

  const useSelectorMock = jest.spyOn(reactRedux, 'useSelector')

  it('should return "Public post"', () => {
    useSelectorMock.mockReturnValue({ username: 'test' })

    const { result } = renderHook(() => useIsPostPublic(true))

    expect(result.current).toBe('Public post')
  })

  it('should return "Private post"', () => {
    useSelectorMock.mockReturnValue({ username: 'test' })

    const { result } = renderHook(() => useIsPostPublic(false))

    expect(result.current).toBe('Private post')
  })
})
