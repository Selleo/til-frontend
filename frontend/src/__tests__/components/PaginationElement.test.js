import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import PaginationElement from '../../components/PaginationElement'

describe('PaginationComponent', () => {
  it('should render with "-active" class', () => {
    render(<PaginationElement isActive />)

    expect(screen.getByRole('button').getAttribute('class')).toContain(
      '-active'
    )
  })

  it('should render with "-dot" class', () => {
    render(<PaginationElement page={'...'} />)

    expect(screen.getByRole('button').getAttribute('class')).toContain('-dot')
  })

  it('should call Fn after click', () => {
    const handleClickMock = jest.fn()

    render(<PaginationElement changePage={handleClickMock} />)
    fireEvent.click(screen.getByRole('button'))

    expect(handleClickMock).toBeCalled()
  })
})
