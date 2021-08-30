import React, { useMemo } from 'react'
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
  const { post, userMenu, userImage, review, animationDelay } = props
  const location = useLocation()
  const user = useUser()
  const isPostOwner = useMemo(() => {
    if (user && post) {
      return user.uuid === post.author.uuid
    }
  }, [user, post])
  const isPublic = useIsPostPublic(post.isPublic)

  let title
  if (location.pathname === '/search') {
    title = <TextBlock value={post.title} />
  } else {
    title = post.title
  }

  const parsed = parseISO(post.createdAt)
  const date = format(parsed, ' dd MMM  hh:mm')

  const TitleLink = () => {
    return review ? (
      <span className="post__title">{title}</span>
    ) : (
      <Link className="post__title" to={`/posts/${post.id}`}>
        {title}
      </Link>
    )
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
          <TitleLink />
        </div>
        <div className="post__body">
          <Markdown source={post.body} />
        </div>
        <div className="post__footer">
          <PostCategories categories={post.categories} />
          {!review && <ReactionBar post={post} />}
        </div>
        {(userMenu || isPostOwner) && (
          <UserPostMenu post={post} userMenu={userMenu} isOnReview={review} />
        )}
      </article>
    </Transition>
  )
}

export default Post
