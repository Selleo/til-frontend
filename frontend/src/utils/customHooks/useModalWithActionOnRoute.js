import React, { useState } from 'react'
import ActionModal from '../../components/ActionModal'
import { useDisableActionOnRouteWithMessage } from './useDisableActionOnRouteWithMessage'

export const useModalWithActionOnRoute = (paths, message, action) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { isDisabled } = useDisableActionOnRouteWithMessage(paths)

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  const handleShowModal = e => {
    if (isDisabled) {
      e.preventDefault()
      toggleModal()
    }
  }

  const renderModal = () => (
    <ActionModal
      text={message}
      action={action}
      isOpen={isModalOpen}
      toggleModal={toggleModal}
    />
  )
  return {
    isDisabled: isDisabled,
    triggerActionModal: handleShowModal,
    ActionModal: renderModal,
  }
}
