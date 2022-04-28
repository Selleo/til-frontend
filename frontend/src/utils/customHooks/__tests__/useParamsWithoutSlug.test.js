import { renderHook } from '@testing-library/react-hooks'
import useParamsWithoutSlug from '../useParamsWithoutSlug'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: '12-test',
  }),
}))

describe('useParamsWithoutSzlug', () => {
  const expectedResult = {
    id: '12',
    slug: 'test',
  }
  it('should return id and rest of slug', () => {
    const { result } = renderHook(() => useParamsWithoutSlug())
    expect(result.current).toEqual(expectedResult)
  })
})
