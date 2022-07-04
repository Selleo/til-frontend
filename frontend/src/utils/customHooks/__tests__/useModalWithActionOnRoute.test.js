import { renderHook } from '@testing-library/react-hooks'
import { useModalWithActionOnRoute } from '../useModalWithActionOnRoute'

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

describe('useModalWithActionOnRoute', () => {
  it('should do stuff', () => {
    const { result } = renderHook(() =>
      useModalWithActionOnRoute(['/test'], 'test message')
    )

    expect(result.current.isDisabled).toBe(true)
    //TODO: test triggerActionModal, actionModal from result.current
  })
})
