import { useParams } from 'react-router-dom'

const useParamsWithoutSlug = () => {
  const { id } = useParams()
  const dashIndex = id.indexOf('-')

  if (dashIndex === -1) {
    return { id, slug: false }
  }
  return { id: id.slice(0, dashIndex), slug: id.slice(dashIndex + 1) }
}

export default useParamsWithoutSlug
