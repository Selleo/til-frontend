import React from 'react'
import { render, screen } from '@testing-library/react'
import PostBanner from '../../components/PostBanner'

describe('PostBanner', () => {
  const postCategoryMock = {
    url: 'www.example.com',
    firstText: 'test1',
    secondText: 'test2',
  }

  it('should render with url', () => {
    render(<PostBanner postCategory={postCategoryMock} />)
    expect(
      screen.getByRole('link', { name: 'learn more' }).getAttribute('href')
    ).toContain('www.example.com')
  })

  it('should render with first text', () => {
    render(<PostBanner postCategory={postCategoryMock} />)
    expect(screen.getByText('test1')).toBeInTheDocument()
  })

  it('should render with second text', () => {
    render(<PostBanner postCategory={postCategoryMock} />)
    expect(screen.getByText('test2')).toBeInTheDocument()
  })
})
