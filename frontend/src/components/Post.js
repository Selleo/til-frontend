import React from 'react'

import { Link } from 'react-router-dom'

import PostContent from './PostContent'

const Post = ({ post, userMenu, review, animationDelay }) =>
  review ? (
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

export default Post
