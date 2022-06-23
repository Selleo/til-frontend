import { checkForToken } from '../auth'

const API_URL = process.env.NEXT_PUBLIC_API_URL
export const fetchSearchedPosts = async (query, page = 1) => {
  const optionsToken = checkForToken()

  const response = await fetch(
    `${API_URL}/api/posts?q=${query}&page=${page}`,
    optionsToken
  )

  const data = response.json()

  return data
}
