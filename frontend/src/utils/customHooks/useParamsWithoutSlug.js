import { useParams } from 'react-router-dom'

const useParamsWithoutSlug = () => {
  const { id } = useParams()

  const dashIndex = id.indexOf('-')

  return dashIndex !== -1
    ? { id: id.slice(0, dashIndex), slug: id.slice(dashIndex + 1) }
    : { id, slug: false }
}

export default useParamsWithoutSlug
