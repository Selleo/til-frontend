import { useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { useRouter } from 'next/router'
import { isEmpty } from 'lodash'
import PostsList from './PostsList'
import { saveCategoryPosts, setPageTitle } from '../store/actions/actions'
import { selectCategoryPostsWithStatus } from '../utils/selectors/selectCategoryPosts'
import PostSkeletonTemplate from './PostSkeletonTemplate'
import PostsPagination from './PostsPagination'
import { statusType } from '../utils/constants'
import EmptyPage from './EmptyPage'
import AddPostButton from '../authenticated/AddPostButton'

const CategoryPosts = () => {
  const { query } = useRouter()
  let searchParams = new URLSearchParams(query).get('categoryId')
  const [posts, status] = useSelector(selectCategoryPostsWithStatus)
  const { categories } = useSelector(state => state)
  const dispatch = useDispatch()

  const savePosts = useCallback(() => {
    const foundCategory = categories.find(
      ({ name }) => name === query.categoryId
    )
    foundCategory && dispatch(saveCategoryPosts(foundCategory.id, searchParams))
    dispatch(setPageTitle(foundCategory?.name))
  }, [searchParams, categories, dispatch, query.categoryId])

  useEffect(() => {
    savePosts()
  }, [savePosts])

  useEffect(() => {
    return () => {
      dispatch(setPageTitle(null))
    }
  }, [dispatch])

  if (!status || status === statusType.loading) {
    return <PostSkeletonTemplate />
  }

  if (isEmpty(posts?.data)) {
    return (
      <EmptyPage
        heading="No posts yet."
        firstLine="Looks a little bit empty here!"
        secondLine="Go to the other categories ro create new one to fill this one."
        ctaComponent={<AddPostButton />}
      />
    )
  }
  return (
    <>
      <PostsList posts={posts.data} currentCategory={query.categoryId} />

      <PostsPagination posts={posts} savePosts={savePosts} />
    </>
  )
}

export default CategoryPosts
