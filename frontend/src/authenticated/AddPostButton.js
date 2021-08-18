import React from 'react'
import { useIsOnRoute } from '../utils/customHooks/useIsOnRoute'
import { Link } from 'react-router-dom'
import { Transition } from '../components/Transition'

const AddPostButton = () => {
  const isOnAddRoute = useIsOnRoute(['add'])

  return (
    <Transition name="zoom-animation" condition={!isOnAddRoute}>
      <Link to="/add-post" className="add-post-btn">
        ADD POST
      </Link>
    </Transition>
  )
}

export default AddPostButton
