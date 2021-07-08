import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'

export const useDisableActionOnRouteWithMessage = (paths, message) => {
  const location = useLocation()
  const [isOnRoute, setIsOnRoute] = useState(false)

  useEffect(() => {
    setIsOnRoute(paths.some(path => location.pathname.includes(path)))
  }, [location, paths])

  const handleNotify = e => {
    e.preventDefault()

    toast.error(message, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
    })
  }

  return {
    isDisabled: isOnRoute,
    notifyMessage: isOnRoute && handleNotify,
  }
}
