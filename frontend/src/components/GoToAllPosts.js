import React from 'react'

import { Link } from 'react-router-dom'

import Icon from './UI/Icon'

const GoToAllPosts = () => (
  <div className="go-to-all-posts">
    <Link to="/" className="go-to-all-posts__link">
      <Icon name="arrowleft" />
      <span className="go-to-all-posts__text">Back to all posts</span>
    </Link>
  </div>
)

export default GoToAllPosts
