import EditPost from '../../src/authenticated/EditPost'
import { useEffect } from 'react'
import useUser from '../../src/utils/customHooks/useUser'
import { useRouter } from 'next/router'
const EditPostView = () => {
  const router = useRouter()
  const user = useUser()
  useEffect(() => {
    if (!user) {
      router.push('/')
    }
  }, [router, user])

  if (!user) {
    return null
  }
  return <EditPost />
}

export default EditPostView
