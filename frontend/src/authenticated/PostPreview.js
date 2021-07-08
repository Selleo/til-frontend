import React from 'react'
import Markdown from '../components/Markdown'
import PostCategories from '../components/PostCategories'
import useUser from '../utils/customHooks/useUser'
import { Link } from 'react-router-dom'
import { getDate } from '../utils'

const PostPreview = props => {
  const user = useUser()
  const { body, title, categories } = props

  return (
    <article className="post -preview">
      <div className="post__header">
        <div className="post__details">
          <img src={user.image} className="user__image" alt="author-img" />
          <div className="post__text-details">
            <div>
              {user.firstName} {user.lastName}
            </div>
            <div className="post__date">{getDate()}</div>
          </div>
        </div>
      </div>
      <Link className="post__title" to={'not-yet'}>
        {title}
      </Link>
      <div className="post__body">
        <Markdown source={body} />
      </div>
      <div className="post__footer">
        <PostCategories categories={categories} preview isHidden />
      </div>
    </article>
  )
}

export default PostPreview
