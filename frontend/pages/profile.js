import UserProfile from '../src/authenticated/UserProfile'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import useUser from '../src/utils/customHooks/useUser'
const UserProfileView = () => {
  const user = useUser()
  const router = useRouter()
  useEffect(() => {
    if (!user) {
      router.push('/')
    }
  }, [router, user])

  if (!user) {
    return null
  }
  return <UserProfile />
}
export default UserProfileView
