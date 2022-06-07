import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import NavigatorButton from '../../components/NavigatorButton'

describe('NavigatorButton', () => {
  it('should render properly', () => {
    const actionMock = jest.fn()

    render(<NavigatorButton action={actionMock} text={'test1'} />)

    expect(screen.getByText('test1')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button'))
    expect(actionMock).toBeCalled()
  })
})
