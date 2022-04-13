import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchUserPosts } from '../utils'
import Post from './Post'
import EmptyPage from './EmptyPage'
import { useDispatch, useSelector } from 'react-redux'
import { statusType } from '../utils/constants'
import PostSkeletonTemplate from './PostSkeletonTemplate'
import { isEmpty } from 'lodash'
import { getAuthorPostsStatus } from '../store/actions/actions'

const { REACT_APP_API_URL: API_URL } = process.env

const UserPosts = () => {
  const [userPosts, setUserPosts] = useState([])
  const { username } = useParams()
  const dispatch = useDispatch()
  const statuses = useSelector(state => state.statuses)

  useEffect(() => {
    dispatch(getAuthorPostsStatus(username))
    fetchUserPosts(`${API_URL}/api/authors/`, username).then(response =>
      setUserPosts(response?.data)
    )
  }, [username])

  if (
    !statuses.authorPostsStatus ||
    statuses.authorPostsStatus === statusType.loading
  )
    return <PostSkeletonTemplate />

  if (isEmpty(userPosts)) return <EmptyPage />

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
