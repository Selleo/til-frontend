import React from 'react'
import 'react-tippy/dist/tippy.css'
import { Tooltip } from 'react-tippy'

const ToolTip = props => {
  const { children, linkLabel, link } = props

  return (
    <Tooltip
      interactive
      arrow
      html={
        <a href={link} target="_blank" rel="noopener noreferrer">
          {linkLabel}
        </a>
      }
    >
      {children}
    </Tooltip>
  )
}

export default ToolTip
