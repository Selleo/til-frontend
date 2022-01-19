import React from 'react'
import { ReactComponent as Share } from '../assets/icons/share.svg'

const CopyButton = props => {
  const { isInTooltip, handleClick, text } = props

  return (
    <button onClick={handleClick} className="post__share-button">
      {!isInTooltip && <Share />}
      <span className="post__share-text">{text}</span>
    </button>
  )
}

export default CopyButton
