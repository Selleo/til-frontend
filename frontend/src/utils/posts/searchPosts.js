import { checkForToken } from '../auth'

const { REACT_APP_API_URL: API_URL } = process.env

export const fetchSearchedPosts = async query => {
  const optionsToken = checkForToken()

  const response = await fetch(
    `${API_URL}/api/posts?query=${query}`,
    optionsToken
  )

  const data = response.json()

  return data
}
