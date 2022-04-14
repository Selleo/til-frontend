import React from 'react'

const PostSkeleton = () => {
  return (
    <article className="post" data-testid="post-skeleton">
      <div className="post__header">
        <div className="post__link">
          <div className="post__details">
            <div className="skeleton post__skeleton-avatar"></div>
            <div className="skeleton post__skeleton-details"></div>
          </div>
        </div>
      </div>
      <div className="skeleton post__skeleton-title"></div>
      <div className="skeleton post__skeleton-body"></div>
    </article>
  )
}

export default PostSkeleton
