import { renderWithReduxAndRouter as renderCategories } from '../../utils/tests/render'
import initialState from '../../__mocks__/authorizedAppStoreMock'
import Categories from '../../components/Categories'
import SideNav from '../../components/SideNav'

describe('<Categories/>', () => {
  it('renders categories', () => {
    const { getByTestId } = renderCategories(SideNav, initialState)
    const categories = getByTestId('categories')
    expect(categories).toBeInTheDocument()
  })

  it('renders first category', () => {
    const { container } = renderCategories(Categories, initialState)
    expect(container.firstChild).toHaveClass('categories__single-category')
  })

  it('renders all categories', () => {
    const { getAllByTestId } = renderCategories(Categories, initialState)
    expect(getAllByTestId('single-category').length).toBe(39)
  })
})
