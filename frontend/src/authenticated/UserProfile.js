import React, { useEffect, useState } from 'react'

import useUser from '../utils/customHooks/useUser'

import Post from '../components/Post'

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
      {userPosts ? (
        <>
          <h1 className="post__my-posts-header">My posts</h1>
          <div className="posts">
            {userPosts.map(post => (
              <Post key={post.id} post={post} userMenu userImage={user.image} />
            ))}
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  )
}

export default UserProfile
