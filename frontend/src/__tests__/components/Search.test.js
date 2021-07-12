import { renderWithReduxAndRouter as render } from '../../utils/tests/render'
import initialState from '../../__mocks__/authorizedAppStoreMock'
import { fireEvent } from '@testing-library/react'
import Search from '../../components/Search'

describe('<Search/>', () => {
  it('Render search input correctly', () => {
    const { getByTestId } = render(Search, initialState)
    expect(getByTestId('search-input')).toBeInTheDocument()
  })

  it('Type text in search input', () => {
    const { getByTestId } = render(Search, initialState)
    const searchInput = getByTestId('search-input')
    const text = 'lorem'
    fireEvent.change(searchInput, { target: { value: text } })
    expect(searchInput.value).toBe(text)
  })

  // it('Search for posts', () => {
  //   const { getAllByTestId } = render(PostsList, initialState)

  //   const posts = getAllByTestId('post')
  //   console.log(posts)
  // })
})
