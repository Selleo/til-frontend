import React from 'react'
import Markdown from '../components/Markdown'
import PostCategories from '../components/PostCategories'
import Avatar from '../components/Avatar'
import useUser from '../utils/customHooks/useUser'
import { getDate } from '../utils'

const PostPreview = props => {
  const user = useUser()
  const { body, title, categories } = props

  return (
    <article className="post -preview">
      <div className="post__header">
        <div className="post__details">
          <Avatar imageUrl={user.image} background="light" />
          <div className="post__text-details">
            <div>
              {user.firstName} {user.lastName}
            </div>
            <div className="post__date">{getDate()}</div>
          </div>
        </div>
      </div>
      <span className="post__title">{title || 'Your title'}</span>
      <div className="post__body">
        <Markdown source={body || 'Your content'} />
      </div>
      <div className="post__footer">
        <PostCategories categories={categories} preview isHidden />
      </div>
    </article>
  )
}

export default PostPreview
