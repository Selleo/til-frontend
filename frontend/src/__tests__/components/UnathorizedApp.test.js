import { renderWithReduxAndRouter as UnathorizedApp } from '../../utils/tests/render'

import App from '../../nonAuthenticated/index'
import initialState from '../../__mocks__/unauthorizedAppStoreMock'

describe('<UnathorizedApp/>', () => {
  it('renders unathorized App properly', () => {
    const { getByTestId } = UnathorizedApp(App, initialState)
    expect(getByTestId('app-main-unathorized')).toBeInTheDocument()
  })

  it('renders log in button', () => {
    const { getByText } = UnathorizedApp(App, initialState)
    expect(getByText(/log in/i)).toBeInTheDocument()
  })
})
