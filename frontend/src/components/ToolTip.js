import React from 'react'
import 'react-tippy/dist/tippy.css'
import { Tooltip } from 'react-tippy'
import { useHistory } from 'react-router'
import { useDispatch } from 'react-redux'
import { saveCategoryPosts } from '../store/actions/actions'

const ToolTip = props => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { children, id, name, url } = props

  const handleClick = (e, id) => {
    if (!url) {
      e.preventDefault()
      history.push(`/category/${name}`)
    }
    dispatch(saveCategoryPosts(id))
  }

  return (
    <Tooltip
      interactive
      arrow
      html={
        <a
          href={url || `"https://selleo.com/blog"`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={e => handleClick(e, id)}
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
