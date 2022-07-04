import { getToken } from '../auth'

export const fetchUser = async url => {
  const token = getToken()
  if (!token) {
    return { errors: 'no token' }
  }
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })

  return response.json()
}
