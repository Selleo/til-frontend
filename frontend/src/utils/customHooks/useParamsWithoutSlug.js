import { useRouter } from 'next/router'

const useParamsWithoutSlug = () => {
  const { query } = useRouter()

  const slugMatcher = /(?<postId>\w+)-?(?<slug>[^]*)/
  const result = slugMatcher.exec(query.postId)
  const {
    groups: { postId, slug },
  } = result

  return { id: postId, slug }
}

export default useParamsWithoutSlug
