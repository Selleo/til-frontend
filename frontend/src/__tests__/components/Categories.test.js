import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import initialState from '../../__mocks__/authorizedAppStoreMock'
import thunk from 'redux-thunk'
import { BrowserRouter as Router } from 'react-router-dom'
import { renderWithReduxAndRouter as renderCategories } from '../../utils/tests/render'

import Categories from '../../components/Categories'

describe('<Categories/>', () => {
  it('renders categories', () => {
    const { container } = renderCategories(Categories, initialState)
    expect(container.firstChild).toHaveClass('categories')
  })

  it('renders all categories', () => {
    const { getAllByTestId } = renderCategories(Categories, initialState)
    expect(getAllByTestId('single-category').length).toBe(39)
  })
})
