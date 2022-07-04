import { useState, useEffect } from 'react'

import { useRouter } from 'next/router'
export const useDisableOnRoute = paths => {
  const router = useRouter()
  const [isOnRoute, setIsOnRoute] = useState(false)

  useEffect(() => {
    setIsOnRoute(paths.some(path => router.asPath.includes(path)))
  }, [router, paths])

  return {
    isDisabled: isOnRoute,
  }
}
