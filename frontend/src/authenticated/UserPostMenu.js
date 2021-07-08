import React from 'react'
import { Link } from 'react-router-dom'
import DeletePost from '../authenticated/DeletePost'

const UserPostMenu = props => {
  const id = props.post.id
  return (
    <>
      <hr className="post__hr" />
      <div className="post__user-menu">
        <Link to={`/edit-post/${id}`}>
          <button className="edit-post-btn">Edit</button>
        </Link>
        <DeletePost postId={id} />
      </div>
    </>
  )
}

export default UserPostMenu
