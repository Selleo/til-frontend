import { useState, useEffect } from 'react'

import Modal from 'react-modal'

const DeleteModal = ({ deletePost, toggleModal }) => {
  const [isModalOpen, setIsModalOpen] = useState(true)

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
      Modal.setAppElement('#__next')
    }
  }, [])

  const handleDelete = () => {
    deletePost()
    setIsModalOpen(false)
    toggleModal()
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    toggleModal()
  }

  return (
    <Modal
      isOpen={isModalOpen}
      style={customStyles}
      shouldCloseOnOverlayClick={true}
      overlayClassName="Overlay delete-modal"
    >
      <div className="delete-modal__content">
        <h3 className="delete-modal__header">
          Are you sure you want to delete this post?
        </h3>
        <div className="delete-modal__buttons">
          <button className="cancel-button" onClick={handleCancel}>
            Cancel
          </button>
          <button onClick={handleDelete} className="delete-post-btn">
            Delete
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default DeleteModal
