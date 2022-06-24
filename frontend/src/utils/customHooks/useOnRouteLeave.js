import { useRouter } from 'next/router'
export const useOnRouteLeave = route => {
  const router = useRouter()

  if (router.pathname !== route) {
    return true
  }
}
