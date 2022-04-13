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
import EmptyPage from './EmptyPage'
import AddPostButton from '../authenticated/AddPostButton'

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
    return (
      <EmptyPage
        heading="No posts yet."
        firstLine="Looksa little bit empty here!"
        secondLine="Go to the other categories ro create new one to fill this one."
        ctaComponent={<AddPostButton />}
      />
    )
  }

  return (
    <>
      <PostsList posts={posts.data} />
      <PostsPagination posts={posts} savePosts={savePosts} />
    </>
  )
}

export default CategoryPosts
