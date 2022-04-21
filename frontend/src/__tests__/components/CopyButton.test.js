import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import CopyButton from '../../components/CopyButton'

describe('CopyButton', () => {
  it('should render Share component', () => {
    render(<CopyButton isInTooltip={false} />)
    expect(
      screen.getByRole('button', { name: 'share.svg' })
    ).toBeInTheDocument()
  })

  it('should not render Share component', () => {
    render(<CopyButton isInTooltip={true} />)
    expect(screen.getByRole('button')).toMatchSnapshot()
  })

  it('should render with text', () => {
    render(<CopyButton text={'test'} />)
    expect(screen.getByText('test')).toBeInTheDocument()
  })

  it('should call Fn after click', () => {
    const handleClickMock = jest.fn()

    render(<CopyButton handleClick={handleClickMock} />)

    fireEvent.click(screen.getByRole('button'))

    expect(handleClickMock).toBeCalledTimes(1)
  })
})
