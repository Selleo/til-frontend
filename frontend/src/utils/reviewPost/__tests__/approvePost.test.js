import { enableFetchMocks, mockResponse, resetMocks } from 'jest-fetch-mock'
import { approvePost } from '../approvePost'

enableFetchMocks()

xdescribe('approvePost', () => {
  beforeEach(() => {
    resetMocks()
  })

  it('should ', async () => {
    mockResponse(res => ({ data: '12345' }))

    //assert on the response
    const res = await approvePost(
      `${process.env.REACT_APP_API_URL}/api/posts/123/review`
    )
    expect(res.data).toEqual('12345')

    //assert on the times called and arguments given to fetch
    expect(fetch.mock.calls.length).toEqual(1)
    expect(fetch.mock.calls[0][0]).toEqual('https://google.com')
  })
})
