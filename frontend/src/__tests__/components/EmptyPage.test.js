import React from 'react'
import { render, screen } from '@testing-library/react'
import EmptyPage from '../../components/EmptyPage'

describe('EmptyPage', () => {
  it('should render properly', () => {
    render(<EmptyPage />)
    expect(screen.getByText('Nothing here.')).toBeInTheDocument()
  })

  it('should render with heading', () => {
    render(<EmptyPage heading="test heading" />)
    expect(screen.getByText('test heading')).toBeInTheDocument()
  })

  it('should render with first line text', () => {
    render(<EmptyPage firstLine="test firstline" />)
    expect(screen.getByText('test firstline')).toBeInTheDocument()
  })

  it('should render with second line text', () => {
    render(<EmptyPage secondLine="test secondline" />)
    expect(screen.getByText('test secondline')).toBeInTheDocument()
  })

  it('should render with cta component', () => {
    render(<EmptyPage ctaComponent={<button>CTA</button>} />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })
})
