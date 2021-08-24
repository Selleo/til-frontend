import React from 'react'
import useUser from './useUser'

export const useIsPostPublic = isPublic => {
  const user = useUser()

  if (!user) {
    return null
  }

  return <>{isPublic ? 'Public' : 'Private'} post</>
}
