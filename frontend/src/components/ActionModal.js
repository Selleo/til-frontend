import { useEffect } from 'react'
import Modal from 'react-modal'

const ActionModal = props => {
  const { message, action, isOpen, setIsOpen } = props

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#272B2F',
      border: 'none',
      maxWidth: '1200px',
      width: '90%',
    },
  }

  useEffect(() => {
    if (process.env.NODE_ENV !== 'test') {
      Modal.setAppElement('#root')
    }
  }, [])

  const handleCancel = () => {
    setIsOpen(!isOpen)
  }

  const handleLeave = () => {
    action()
    setIsOpen(!isOpen)
  }

  return (
    <Modal
      isOpen={isOpen}
      style={customStyles}
      shouldCloseOnOverlayClick
      shouldCloseOnEsc
      overlayClassName="Overlay action-modal"
      appElement={document.getElementById('root')}
    >
      <div className="action-modal__content">
        <h3 className="action-modal__header">{message}</h3>
        <div className="action-modal__buttons">
          <button className="cancel-button" onClick={handleCancel}>
            Stay
          </button>
          <button className="delete-post-btn" onClick={handleLeave}>
            Leave anyway
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default ActionModal
