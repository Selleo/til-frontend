import React, { useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useLocation } from 'react-router-dom'
import { isEmpty } from 'lodash'
import PostsList from './PostsList'
import { saveCategoryPosts } from '../store/actions/actions'
import { selectCategoryPostsWithStatus } from '../utils/selectors/selectCategoryPosts'
import PostSkeletonTemplate from './PostSkeletonTemplate'
import PostsPagination from './PostsPagination'
import { statusType } from '../utils/constants'
import NothingFound from './NothingFound'

const CategoryPosts = () => {
  const { search } = useLocation()
  let searchParams = new URLSearchParams(search).get('page')
  const [posts, status] = useSelector(selectCategoryPostsWithStatus)
  const categories = useSelector(state => state.categories)

  const dispatch = useDispatch()
  const { id } = useParams()

  const savePosts = useCallback(() => {
    const foundCategory = categories.find(({ name }) => name === id)
    foundCategory && dispatch(saveCategoryPosts(foundCategory.id, searchParams))
  }, [searchParams, categories, dispatch, id])

  useEffect(() => {
    savePosts()
  }, [savePosts])

  if (!status || status === statusType.loading) {
    return <PostSkeletonTemplate />
  }

  if (isEmpty(posts?.data)) {
    return <NothingFound />
  }

  return (
    <>
      <PostsList posts={posts.data} />
      <PostsPagination posts={posts} savePosts={savePosts} />
    </>
  )
}

export default CategoryPosts
