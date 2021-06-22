import React from 'react'
import 'react-tippy/dist/tippy.css'
import { Tooltip } from 'react-tippy'
import { useHistory } from 'react-router'

const ToolTip = props => {
  const history = useHistory()
  const { children, name, link } = props

  const handleClick = e => {
    if (!link) {
      e.preventDefault()
      history.push(`/category/${name}`)
    }
  }

  return (
    <Tooltip
      interactive
      arrow
      html={
        <a
          href={link || `"https://selleo.com/blog"`}
          rel="noopener noreferrer"
          onClick={handleClick}
        >
          {name}
        </a>
      }
    >
      {children}
    </Tooltip>
  )
}

export default ToolTip
