import { fireEvent, screen } from '@testing-library/react'
import ActionModal from '../../components/ActionModal'
import renderWithStore from '../../tests/utils/renderWithStore'

import ReactModal from 'react-modal'
ReactModal.setAppElement('*')

describe('ActionModal', () => {
  it('should render', () => {
    const { baseElement } = renderWithStore(
      <ActionModal isOpen={true} message={'test'} />
    )
    expect(baseElement).toMatchSnapshot()
    expect(screen.getByText('Stay')).toBeInTheDocument()
    expect(screen.getByText('Leave anyway')).toBeInTheDocument()
  })
  it('should call setIsOpen prop on "stay" button click', () => {
    const setIsOpenMock = jest.fn()
    renderWithStore(
      <ActionModal setIsOpen={setIsOpenMock} isOpen message={'test'} />
    )
    fireEvent.click(screen.getByText('Stay'))

    expect(setIsOpenMock).toHaveBeenCalled()
  })
  it('should call setIsOpen and action prop on "leave" button click', () => {
    const setIsOpenMock = jest.fn()
    const actionMock = jest.fn()
    renderWithStore(
      <ActionModal
        setIsOpen={setIsOpenMock}
        action={actionMock}
        isOpen
        message={'test'}
        ariaHideApp={false}
      />
    )
    fireEvent.click(screen.getByText('Leave anyway'))

    expect(actionMock).toHaveBeenCalled()
  })
})
