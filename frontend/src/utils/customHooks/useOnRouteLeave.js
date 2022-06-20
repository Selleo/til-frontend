// import { useLocation } from 'react-router-dom'
import { useRouter } from 'next/router'
export const useOnRouteLeave = route => {
  // const location = useLocation()
  const router = useRouter()

  if (router.pathname !== route) {
    return true
  }
}
