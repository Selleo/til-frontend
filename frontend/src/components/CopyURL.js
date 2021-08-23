import React, { useState } from 'react'
import { getCurrentURL } from '../utils'
import CopyButton from './CopyButton'
import { Tooltip } from 'react-tippy'

const CopyPostURL = ({ postId }) => {
  const [isCopied, setIsCopied] = useState('Click to copy link')

  const copyURL = () => {
    let currentURL = getCurrentURL()

    if (postId) {
      currentURL = currentURL + `posts/${postId}`
    }

    navigator.clipboard.writeText(currentURL)
    setIsCopied('Copied!')

    setTimeout(() => {
      setIsCopied('Click to copy link')
    }, 300)
  }

  return (
    <Tooltip
      className="ToolTip"
      arrow
      delay={150}
      duration={500}
      html={<div>{isCopied}</div>}
    >
      <CopyButton handleClick={copyURL} text={'Share'} />
    </Tooltip>
  )
}

export default CopyPostURL
