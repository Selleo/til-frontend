import { useRouter } from 'next/router'

export const useSearchQuery = () => useRouter().query.q
