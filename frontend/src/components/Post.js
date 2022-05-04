import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import PostContent from './PostContent'

const Post = ({
  post,
  userMenu,
  review,
  animationDelay,
  isClickable = false,
}) =>
  review || !isClickable ? (
    <PostContent
      animationDelay={animationDelay}
      post={post}
      review={review}
      userMenu={userMenu}
    />
  ) : (
    <Link className="post-wrapper" to={`/posts/${post.id}-${post.slug}`}>
      <PostContent
        animationDelay={animationDelay}
        post={post}
        review={review}
        userMenu={userMenu}
      />
    </Link>
  )

Post.propTypes = {
  animationDelay: PropTypes.number,
  isClickable: PropTypes.bool,
  post: PropTypes.object,
  review: PropTypes.bool,
  userMenu: PropTypes.object,
}

export default Post
