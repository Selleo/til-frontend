import React, { useEffect, useState } from 'react'

import useUser from '../utils/customHooks/useUser'

import PostContent from '../components/PostContent'
import { isEmpty } from 'lodash'
import EmptyPage from '../components/EmptyPage'
import AddPostButton from './AddPostButton'
import { statusType } from '../utils/constants'
import PostSkeletonTemplate from '../components/PostSkeletonTemplate'
import { useSelector } from 'react-redux'

const UserProfile = () => {
  const [userPosts, setUserPosts] = useState(null)
  const user = useUser()
  const statuses = useSelector(state => state.statuses)

  useEffect(() => {
    if (user) {
      setUserPosts(user.posts.data)
    }
  }, [user])

  if (!statuses.currentUser || statuses.currentUser === statusType.loading)
    return <PostSkeletonTemplate />

  if (isEmpty(userPosts)) {
    return (
      <EmptyPage
        ctaComponent={<AddPostButton />}
        firstLine="Looks a little bit empty here!"
        heading="No posts yet."
      />
    )
  }

  return (
    <>
      <h1 className="post__my-posts-header">My posts</h1>
      <div className="posts">
        {userPosts.map(post => (
          <PostContent
            key={post.id}
            post={post}
            userMenu
            userImage={user.image}
          />
        ))}
      </div>
    </>
  )
}

export default UserProfile
