import { renderHook } from '@testing-library/react-hooks'
import { useModalWithActionOnRoute } from '../useModalWithActionOnRoute'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: '/test',
  }),
}))

describe('useModalWithActionOnRoute', () => {
  it('should do stuff', () => {
    const { result } = renderHook(() =>
      useModalWithActionOnRoute(['/test'], 'test message')
    )
    expect(result.current.isDisabled).toBe(true)
    //TODO: test triggerActionModal, actionModal from result.current
  })
})
