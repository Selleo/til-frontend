import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import ActionModal from '../../components/ActionModal'

describe('ActionModal', () => {
  it('should render', () => {
    const { baseElement } = render(
      <ActionModal isOpen={true} message={'test'} />
    )
    expect(baseElement).toMatchSnapshot()
    expect(screen.getByText('Stay')).toBeInTheDocument()
    expect(screen.getByText('Leave anyway')).toBeInTheDocument()
  })
  it('should call setIsOpen prop on "stay" button click', () => {
    const setIsOpenMock = jest.fn()
    render(<ActionModal setIsOpen={setIsOpenMock} isOpen message={'test'} />)
    fireEvent.click(screen.getByText('Stay'))

    expect(setIsOpenMock).toHaveBeenCalled()
  })
  it('should call setIsOpen and action prop on "leave" button click', () => {
    const setIsOpenMock = jest.fn()
    const actionMock = jest.fn()
    render(
      <ActionModal
        setIsOpen={setIsOpenMock}
        action={actionMock}
        isOpen
        message={'test'}
      />
    )
    fireEvent.click(screen.getByText('Leave anyway'))

    expect(actionMock).toHaveBeenCalled()
  })
})
