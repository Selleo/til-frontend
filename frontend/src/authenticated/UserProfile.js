import React, { useEffect, useState } from 'react'

import useUser from '../utils/customHooks/useUser'

import Post from '../components/Post'
import { isEmpty } from 'lodash'
import EmptyPage from '../components/EmptyPage'
import AddPostButton from './AddPostButton'

const UserProfile = () => {
  const [userPosts, setUserPosts] = useState(null)
  const user = useUser()

  useEffect(() => {
    if (user) {
      setUserPosts(user.posts.data)
    }
  }, [user])

  return (
    <>
      {isEmpty(userPosts) ? (
        <EmptyPage
          ctaComponent={<AddPostButton />}
          firstLine={'Looks a little bit empty here!'}
          heading={'No posts yet.'}
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
