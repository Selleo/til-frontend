import { useParams } from 'react-router-dom'

const useParamsWithoutSlug = () => {
  const { id } = useParams()

  const slugMatcher = /(?<postId>\w+)-?(?<slug>[^]*)/
  const result = slugMatcher.exec(id)
  const {
    groups: { postId, slug },
  } = result

  return { id: postId, slug }
}

export default useParamsWithoutSlug
