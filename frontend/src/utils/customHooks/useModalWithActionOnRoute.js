import React, { useState } from 'react'
import ActionModal from '../../components/ActionModal'
import { useDisableOnRoute } from './useDisableOnRoute'

export const useModalWithActionOnRoute = (paths, message) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalAction, setModalAction] = useState(null)
  const { isDisabled } = useDisableOnRoute(paths)

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  const handleShowModal = (actionForModal, e) => {
    if (isDisabled) {
      e.preventDefault()
      toggleModal()
      setModalAction(() => actionForModal)
    }
  }

  const renderModal = () =>
    isModalOpen && (
      <ActionModal
        text={message}
        action={modalAction}
        toggleModal={toggleModal}
        isOpen={isModalOpen}
      />
    )

  return {
    isDisabled: isDisabled,
    triggerActionModal: handleShowModal,
    ActionModal: renderModal,
  }
}
