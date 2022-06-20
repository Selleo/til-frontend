// import { useLocation } from 'react-router-dom'
import { useRouter } from 'next/router'

export const useSearchQuery = () => useRouter().query.q
