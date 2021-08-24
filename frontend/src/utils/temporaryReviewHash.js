export const localStorageTemporaryHash = 'temporary_hashed_id'

export const saveHash = hash => {
  window.localStorage.setItem(localStorageTemporaryHash, hash)
}

export const getHash = () => {
  return window.localStorage.getItem(localStorageTemporaryHash) || null
}

export const deleteHash = () => {
  window.localStorage.removeItem(localStorageTemporaryHash)
}
