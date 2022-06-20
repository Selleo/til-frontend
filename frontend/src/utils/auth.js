const localStorageKey = 'til_token'

// TOKENS
export const deleteToken = () => {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(localStorageKey)
  }
}

export const getToken = () => {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem(localStorageKey)
  }
}

export const checkForToken = () => {
  const optionsToken = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'application/json',
    },
  }

  return getToken() ? optionsToken : null
}
