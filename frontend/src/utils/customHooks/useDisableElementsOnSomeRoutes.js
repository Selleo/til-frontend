import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const useDisableElementsOnSomeRoutes = props => {
  const location = useLocation()
  const [disable, setDisable] = useState(false)

  useEffect(() => {
    if (props) {
      props.map(path => location.pathname.includes(path) && setDisable(true))
    } else {
      setDisable(false)
    }
  }, [location, props])

  return disable
}
