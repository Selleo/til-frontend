import React from 'react'

import { useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'

import { delayStep } from './Transition'
import PostContent from './PostContent'

const PostsList = ({ posts }) => {
  const { pathname } = useLocation()

  const currentCategory =
    pathname.includes('category') && pathname.split('/')[2]

  let delay = 0
  const interactive = true
  return (
    <div className="posts-list-wrapper">
      {currentCategory && (
        <h1 className="posts-list-wrapper__header">
          Posts in {currentCategory}
        </h1>
      )}
      {posts.map(post => {
        delay += delayStep
        return (
          <PostContent
            key={post.id}
            post={post}
            animationDelay={delay}
            interactive={interactive}
          />
        )
      })}
    </div>
  )
}

PostsList.propTypes = { posts: PropTypes.array.isRequired }

export default PostsList
