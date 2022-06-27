import { useRouter } from 'next/router'

// URLS
export const getCurrentURL = () => {
  return document.URL
}

export const useQuery = () => {
  const queryString = useRouter().search

  return new URLSearchParams(queryString)
}
