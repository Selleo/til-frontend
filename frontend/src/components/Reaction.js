import React, { useState, useEffect } from 'react'

import { useDispatch } from 'react-redux'
import classNames from 'classnames'

import { saveAllPosts, saveAllUsers } from '../store/actions/actions'
import { handleReaction, checkHasReacted } from '../utils'
import useUser from '../utils/customHooks/useUser'

const Reaction = ({ post: { id }, reaction: { type, whoReacted, Icon } }) => {
  const [hasReacted, setHasReacted] = useState(false)
  const [reactionNumber, setReactionNumber] = useState(0)

  const user = useUser()
  const dispatch = useDispatch()

  const iconActiveClasses = classNames(type, {
    '-fill': hasReacted,
  })

  useEffect(() => {
    if (user) {
      const didReact = checkHasReacted(whoReacted, user.uuid)

      setHasReacted(didReact)
      setReactionNumber(whoReacted.length)
    }
  }, [user, whoReacted])

  const toggleReaction = async e => {
    e.preventDefault()

    if (hasReacted) {
      await handleReaction(id, 'DELETE', type)
        .then(() => {
          setHasReacted(false)
          setReactionNumber(reactionNumber => reactionNumber - 1)
          dispatch(saveAllPosts())
          dispatch(saveAllUsers())
        })
        .catch(err => console.error(err))
    } else {
      await handleReaction(id, 'POST', type)
        .then(() => {
          setHasReacted(true)
          setReactionNumber(reactionNumber => reactionNumber + 1)
          dispatch(saveAllPosts())
          dispatch(saveAllUsers())
        })
        .catch(err => console.error(err))
    }
  }

  return (
    <div className="post__single-reaction" onClick={toggleReaction}>
      <Icon className={iconActiveClasses} />
      <div className="reaction-number">{reactionNumber}</div>
    </div>
  )
}

export default Reaction
