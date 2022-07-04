import AddPost from '../src/authenticated/AddPost'
import { useEffect } from 'react'
import useUser from '/src/utils/customHooks/useUser'
import { useRouter } from 'next/router'
const AddPostView = () => {
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
  return <AddPost />
}

export default AddPostView
