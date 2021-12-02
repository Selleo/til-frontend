import { useParams } from 'react-router-dom'

const useParamsWithoutSlug = () => {
  const { id } = useParams()

  if (id.includes('-')) {
    const splittedId = id.split('-')
    return { id: splittedId.shift(), slug: splittedId.join('-') }
  }
  return { id, slug: false }
}

export default useParamsWithoutSlug
