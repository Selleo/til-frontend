import React from 'react'
import { prettyDOM, render, screen } from '@testing-library/react'
import Avatar from '../../components/Avatar'

describe('Avatar', () => {
  it('should render with light background', () => {
    render(<Avatar background="light" />)
    expect(
      screen.getByTestId('avatar-without-image').getAttribute('class')
    ).toContain('-background-light')
  })

  it('should render with dark background', () => {
    render(<Avatar background="dark" />)
    expect(
      screen.getByTestId('avatar-without-image').getAttribute('class')
    ).toContain('-background-dark')
  })

  it('should render with user avatar', () => {
    render(<Avatar imageUrl="http://placekitten.com/200/300" />)
    expect(screen.getByAltText('author-img')).toBeInTheDocument()
  })

  it('should render without user avatar', () => {
    render(<Avatar />)
    expect(screen.getByTestId('avatar-without-image')).toBeInTheDocument()
  })
})
