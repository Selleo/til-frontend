import { useState } from 'react'

import { Tooltip } from 'react-tippy'
import PropTypes from 'prop-types'

import CopyButton from './CopyButton'

const CopyPostURL = ({ id, slug }) => {
  const [buttonText, setButtonText] = useState('Click to copy link')

  const copyURL = e => {
    e.preventDefault()

    let url = window.location.origin
    if (id && slug) {
      url += `/posts/${id}-${slug}`
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
      delay={150}
      duration={300}
      html={<div>{buttonText}</div>}
    >
      <CopyButton handleClick={copyURL} text={'Share'} />
    </Tooltip>
  )
}

export default CopyPostURL

CopyPostURL.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  slug: PropTypes.string.isRequired,
}
