import React from 'react'
import PropTypes from 'prop-types'
import { delayStep } from './Transition'
import Post from './Post'
import '../App.css'

const PostsList = ({ posts }) => {
  let delay = 0

  return posts.map(post => {
    delay += delayStep
    return <Post key={post.id} post={post} animationDelay={delay} />
  })
}

PostsList.propTypes = { posts: PropTypes.array.isRequired }

export default PostsList
