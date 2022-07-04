import { useEffect, useState } from 'react'

import { fetchUserPosts } from '../utils'
import PostContent from './PostContent'
import EmptyPage from './EmptyPage'
import { useDispatch, useSelector } from 'react-redux'
import { statusType } from '../utils/constants'
import PostSkeletonTemplate from './PostSkeletonTemplate'
import { isEmpty } from 'lodash'
import { getAuthorPostsStatus } from '../store/actions/actions'
import useUser from '../utils/customHooks/useUser'
import { setPageDescription, setPageTitle } from '../store/actions/actions'
import { useRouter } from 'next/router'

const API_URL = process.env.NEXT_PUBLIC_API_URL

const UserPosts = () => {
  const [userPosts, setUserPosts] = useState([])
  const { query } = useRouter()

  const username = query.userName
  const dispatch = useDispatch()
  const user = useUser()
  const statuses = useSelector(state => state.statuses)
  const pageHeader = `Posts created by ${userPosts[0]?.author.firstName} ${userPosts[0]?.author.lastName}`

  useEffect(() => {
    dispatch(getAuthorPostsStatus(username))
    dispatch(setPageTitle(`${user?.firstName} ${user?.lastName}`))
    dispatch(setPageDescription(pageHeader))
    fetchUserPosts(`${API_URL}/api/authors/`, username).then(response =>
      setUserPosts(response?.data)
    )
  }, [username, user, dispatch, pageHeader])

  useEffect(() => {
    return () => {
      dispatch(setPageTitle(null))
      dispatch(setPageDescription(null))
    }
  }, [dispatch])

  if (
    !statuses.authorPostsStatus ||
    statuses.authorPostsStatus === statusType.loading
  )
    return <PostSkeletonTemplate />

  if (isEmpty(userPosts)) return <EmptyPage />

  return (
    <>
      <h3 className="users-posts__title">{pageHeader}</h3>
      {userPosts.map(post => (
        <PostContent key={post.id} post={post} />
      ))}
    </>
  )
}

export default UserPosts
