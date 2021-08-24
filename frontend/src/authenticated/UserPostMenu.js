import React from 'react'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import DeletePost from '../authenticated/DeletePost'

const UserPostMenu = props => {
  const { post, isOnProfile, isOnReview } = props
  const { id } = post

  const postUserMenuClasses = classNames('post__user-menu', {
    '-owner-view': !isOnProfile,
  })

  if (isOnReview) {
    return null
  }

  return (
    <>
      <hr className="post__hr" />
      <div className={postUserMenuClasses}>
        <Link to={`/edit-post/${id}`}>
          <button className="edit-post-btn">Edit</button>
        </Link>
        {isOnProfile && <DeletePost postId={id} />}
      </div>
    </>
  )
}

export default UserPostMenu
