import React, { useState } from 'react'
import PropTypes from 'prop-types'
import CopyButton from './CopyButton'
import { Tooltip } from 'react-tippy'

const CopyPostURL = ({ post }) => {
  const [buttonText, setButtonText] = useState('Click to copy link')

  const copyURL = () => {
    let url = window.location.origin
    if (post) {
      url += `/posts/${post.id}-${post.slug}`
    }

    navigator.clipboard.writeText(url)
    setButtonText('Copied!')

    setTimeout(() => {
      setButtonText('Click to copy link')
    }, 1000)
  }

  return (
    <Tooltip
      className="ToolTip"
      arrow
      delay={150}
      duration={1000}
      html={<div>{buttonText}</div>}
    >
      <CopyButton handleClick={copyURL} text={'Share'} />
    </Tooltip>
  )
}

export default CopyPostURL

CopyPostURL.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
  }),
}
