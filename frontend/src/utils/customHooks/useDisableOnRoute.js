import { useState, useEffect } from 'react'
// import { useLocation } from 'react-router-dom'
import { useRouter } from 'next/router'
export const useDisableOnRoute = paths => {
  // const location = useLocation()
  const router = useRouter()
  const [isOnRoute, setIsOnRoute] = useState(false)

  useEffect(() => {
    setIsOnRoute(paths.some(path => router.pathname.includes(path)))
  }, [router, paths])

  return {
    isDisabled: isOnRoute,
  }
}
