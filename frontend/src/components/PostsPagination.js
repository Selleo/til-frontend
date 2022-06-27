import { useEffect } from 'react'

import { useRouter } from 'next/router'
import { usePagination } from '../utils/customHooks/usePagination'
import PaginationElement from './PaginationElement'

const PostsPagination = ({ posts }) => {
  const router = useRouter()
  const { pagination, PREV, NEXT, DOTS } = usePagination(posts)

  useEffect(() => {
    if (!posts.data.length) {
      return null
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }, [posts.data.length])

  const switchToSpecificPage = page => {
    if (!router.location.search && page === 1) return
    if (page !== DOTS)
      router.asPath.includes('category')
        ? router.push(`${router.asPath}?page=${page}`)
        : router.push(`/?page=${page}`)
  }

  const switchToPrevPage = () => {
    if (posts.pageNumber > 1)
      router.asPath.includes('category')
        ? router.push(`${router.asPath}?page=${posts.pageNumber - 1}`)
        : router.push(`/?page=${posts.pageNumber - 1}`)
  }

  const switchToNextPage = () => {
    if (posts.pageNumber < posts.totalPages)
      router.asPath.includes('category')
        ? router.push(`${router.asPath}?page=${posts.pageNumber + 1}`)
        : router.push(`/?page=${posts.pageNumber + 1}`)
  }

  return (
    <nav className="pagination__wrapper">
      {pagination.map((page, index) => {
        if (page === PREV)
          return (
            <PaginationElement
              page={page}
              key={index}
              isActive={posts.pageNumber === page}
              changePage={switchToPrevPage}
            />
          )
        if (page === NEXT)
          return (
            <PaginationElement
              page={page}
              key={index}
              isActive={posts.pageNumber === page}
              changePage={switchToNextPage}
            />
          )

        return (
          <PaginationElement
            page={page}
            key={index}
            isActive={posts.pageNumber === page}
            changePage={switchToSpecificPage}
          />
        )
      })}
    </nav>
  )
}

export default PostsPagination
