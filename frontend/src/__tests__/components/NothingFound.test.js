import React from 'react'
import { render, screen } from '@testing-library/react'
import NothingFound from '../../components/NothingFound'

describe('Nothing found', () => {
  it('should render', () => {
    render(<NothingFound text="test" />)
    expect(screen.getByText('Nothing found with phrase:')).toBeInTheDocument()
    expect(screen.getByText('test')).toBeInTheDocument()
  })
})
