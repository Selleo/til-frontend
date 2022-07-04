import React from 'react'
import { useIsOnRoute } from '../utils/customHooks/useIsOnRoute'
import Link from 'next/link'
import { Transition } from '../components/Transition'

const AddPostButton = () => {
  const isOnAddRoute = useIsOnRoute(['add'])

  return (
    <Transition name="zoom-animation" condition={!isOnAddRoute}>
      <Link href="/add-post">
        <a className="add-post-btn"> ADD POST</a>
      </Link>
    </Transition>
  )
}

export default AddPostButton
