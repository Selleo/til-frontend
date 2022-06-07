import useUser from './useUser'

export const useIsPostPublic = isPublic => {
  const user = useUser()
  if (!user) {
    return null
  }

  return isPublic ? 'Public post' : 'Private post'
}
