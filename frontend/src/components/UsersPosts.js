import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchUserPosts } from '../utils'
import Post from './Post'

const { REACT_APP_API_URL: API_URL } = process.env

const UserPosts = () => {
  const [userPosts, setUserPosts] = useState([])
  const { username } = useParams()

  useEffect(() => {
    const posts = async () => {
      const posts = await fetchUserPosts(`${API_URL}/api/authors/`, username)
      posts?.data && setUserPosts(posts.data)
    }
    posts()
  }, [username])

  if (userPosts.length === 0) return null

  return (
    <>
      <h3 className="users-posts__title">{`Posts created by ${userPosts[0].author.firstName} ${userPosts[0].author.lastName}`}</h3>
      {userPosts.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </>
  )
}

export default UserPosts
