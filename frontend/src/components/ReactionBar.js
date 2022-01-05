import React, { useEffect, useState } from 'react'

import { convertReactions } from '../utils'

import Reaction from './Reaction'

const ReactionBar = ({ post }) => {
  const [reactions, setReactions] = useState()

  useEffect(() => {
    const reactionArray = convertReactions(post.reactions)
    setReactions(reactionArray)
  }, [post.reactions])

  if (!reactions) return null

  return (
    <div className="post__reactions">
      {reactions.map(reaction => (
        <Reaction key={reaction.type} post={post} reaction={reaction} />
      ))}
    </div>
  )
}

export default ReactionBar
