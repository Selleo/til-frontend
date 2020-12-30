import { fireEvent } from '@testing-library/react'
import { renderWithReduxAndRouter as AuthorizedApp } from '../../utils/tests/render'

import App from '../../authenticated/index'
import initialState from '../../__mocks__/authorizedAppStoreMock'

describe('<AuthorizedApp/>', () => {
  it('renders correctly', () => {
    const { getByTestId } = AuthorizedApp(App, initialState)
    expect(getByTestId('authenticated-app')).toMatchSnapshot()
  })
  it('renders add post button', () => {
    const { getByText } = AuthorizedApp(App, initialState)
    expect(getByText(/add post/i)).toBeInTheDocument()
  })

  it('renders user admin menu', () => {
    const { getByTestId } = AuthorizedApp(App, initialState)
    expect(getByTestId('user-name')).toBeInTheDocument()
  })

  it('displays user menu after clicking on user name', () => {
    const { getByTestId } = AuthorizedApp(App, initialState)
    const userMenuButton = getByTestId('user-name')
    fireEvent.click(userMenuButton)

    expect(getByTestId('user-menu')).not.toHaveClass('-hidden')
  })
})
