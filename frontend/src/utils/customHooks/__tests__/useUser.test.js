import { renderHook } from '@testing-library/react-hooks'
import * as reactRedux from 'react-redux'
import useUser from '../useUser'

describe('useUser', () => {
  beforeEach(() => {
    useSelectorMock.mockClear()
  })

  const expectedResult = {
    username: 'test',
    mail: 'test@test.com',
    posts: ['test'],
  }

  const useSelectorMock = jest.spyOn(reactRedux, 'useSelector')

  it('should return user data', () => {
    useSelectorMock.mockReturnValue({
      username: 'test',
      mail: 'test@test.com',
      posts: ['test'],
    })

    const { result } = renderHook(() => useUser())

    expect(result.current).toEqual(expectedResult)
  })
})
