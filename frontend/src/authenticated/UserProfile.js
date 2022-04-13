import React, { useEffect, useState } from 'react'

import useUser from '../utils/customHooks/useUser'

import Post from '../components/Post'
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

  return (
    <>
      {isEmpty(userPosts) ? (
        <EmptyPage
          ctaComponent={<AddPostButton />}
          firstLine="Looks a little bit empty here!"
          heading="No posts yet."
        />
      ) : (
        <>
          <h1 className="post__my-posts-header">My posts</h1>
          <div className="posts">
            {userPosts.map(post => (
              <Post key={post.id} post={post} userMenu userImage={user.image} />
            ))}
          </div>
        </>
      )}
    </>
  )
}

export default UserProfile
