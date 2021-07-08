import React from 'react'
import 'react-tippy/dist/tippy.css'
import { Tooltip } from 'react-tippy'
import { useHistory } from 'react-router'
import { useDispatch } from 'react-redux'
import { saveCategoryPosts } from '../store/actions/actions'

const ToolTip = props => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { isHidden, children, id, name, url } = props
  const link = url || 'https://selleo.com/blog'

  if (isHidden) {
    return children
  }

  const handleClick = (e, id) => {
    e.preventDefault()
    history.push(`/category/${name}`)
    dispatch(saveCategoryPosts(id))
  }

  return (
    <Tooltip
      className="ToolTip"
      interactive
      arrow
      html={
        <a href={link} target="_blank" rel="noopener noreferrer">
          {name}
        </a>
      }
    >
      <a
        className="ToolTip__link"
        href={link}
        onClick={e => handleClick(e, id)}
      >
        {children}
      </a>
    </Tooltip>
  )
}

export default ToolTip
