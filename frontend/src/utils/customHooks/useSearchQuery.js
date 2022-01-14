import { useLocation } from 'react-router-dom'

export const useSearchQuery = () => useLocation().search.replace('?q=', '')
