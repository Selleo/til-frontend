import React, { useState } from 'react'
import { request } from '../utils'
import { useHistory } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { saveAllPosts, saveCurrentUser } from '../store/actions/actions'
import DeleteModal from './DeleteModal'
import postSuccessToast from '../utils/toasts/postSuccessToast'

const { REACT_APP_API_URL: API_URL } = process.env

const DeletePost = ({ postId }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [isModalOpen, setIsOpenModal] = useState(false)

  const toggleModal = e => {
    if (e) {
      e.preventDefault()
    }
    setIsOpenModal(!isModalOpen)
  }

  const deletePost = async () => {
    const isDeleted = await request(
      'DELETE',
      `${API_URL}/api/me/posts/${postId}`
    )

    if (isDeleted.ok) {
      history.push('/')
      dispatch(saveAllPosts())
      dispatch(saveCurrentUser())
      postSuccessToast('Post deleted successfully.')
    }

    history.push('/')
    history.go()
  }

  return (
    <>
      <button className="delete-post-btn" onClick={toggleModal}>
        Delete
      </button>
      {isModalOpen && (
        <DeleteModal deletePost={deletePost} toggleModal={toggleModal} />
      )}
    </>
  )
}

export default DeletePost
