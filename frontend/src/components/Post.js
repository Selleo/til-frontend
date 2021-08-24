import React, { useState, useEffect } from 'react'
import Markdown from './Markdown'
import CopyPostURL from './CopyURL'
import PostCategories from './PostCategories'
import UserPostMenu from '../authenticated/UserPostMenu'
import ReactionBar from './ReactionBar'
import { Link, useLocation } from 'react-router-dom'
import TextBlock from './TextBlock'
import { format, parseISO } from 'date-fns'
import { Transition } from './Transition'
import useUser from '../utils/customHooks/useUser'
import { useIsPostPublic } from '../utils/customHooks/useIsPostPublic'

const Post = props => {
  const { post, isOnProfile, userImage, review, animationDelay } = props
  const location = useLocation()
  const user = useUser()
  const [isPostOwner, setIsPostOwner] = useState(false)
  const isPublic = useIsPostPublic(post.isPublic)

  useEffect(() => {
    if (user && post) {
      setIsPostOwner(user.uuid === post.author.uuid)
    }
  }, [user, post])

  let title
  if (location.pathname === '/search') {
    title = <TextBlock value={post.title} />
  } else {
    title = post.title
  }

  const parsed = parseISO(post.createdAt)
  const date = format(parsed, ' dd MMM  hh:mm')

  const handleTitleClick = e => {
    if (review) {
      e.preventDefault()
    }
  }

  return (
    <Transition name="post-animation" delay={animationDelay}>
      <article
        className="post"
        style={{ transitionDelay: `${animationDelay}ms` }}
      >
        <div className="post__header">
          <div className="post__details">
            <img
              src={post.author.image || userImage}
              className="user__image"
              alt="author-img"
            />
            <div className="post__text-details">
              <div>
                {post.author.firstName} {post.author.lastName}
              </div>
              <div className="post__date">{date}</div>
              <div className="post__is-public">{isPublic}</div>
            </div>
          </div>
          {!review && <CopyPostURL postId={post.id} />}
        </div>
        <div>
          <Link
            className="post__title"
            to={`/posts/${post.id}`}
            onClick={e => handleTitleClick(e)}
          >
            {title}
          </Link>
        </div>
        <div className="post__body">
          <Markdown source={post.body} />
        </div>
        <div className="post__footer">
          <PostCategories categories={post.categories} />
          {!review && <ReactionBar post={post} />}
        </div>
        {(isOnProfile || isPostOwner) && (
          <UserPostMenu
            post={post}
            isOnProfile={isOnProfile}
            isOnReview={review}
          />
        )}
      </article>
    </Transition>
  )
}

export default Post
