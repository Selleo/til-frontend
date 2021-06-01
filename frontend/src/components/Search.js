import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { saveSearchedPosts, saveSearchedQuery } from '../store/actions/actions'
import { useOnRouteLeave } from '../utils/customHooks/useOnRouteLeave'
import { ReactComponent as SearchIcon } from '../assets/icons/search.svg'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Search = () => {
  const [input, setInput] = useState('')
  const [timeoutID, setTimeoutID] = useState(null)
  const [disableInput, setDisableInput] = useState(false)
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  const hasLeavedRoute = useOnRouteLeave('/search')

  useEffect(() => {
    if (hasLeavedRoute) {
      dispatch(saveSearchedQuery(''))
      setInput('')
    }
  }, [hasLeavedRoute, dispatch])

  useEffect(() => {
    if (
      location.pathname.includes('add') ||
      location.pathname.includes('edit')
    ) {
      setDisableInput(true)
    } else {
      setDisableInput(false)
    }
  }, [location])

  const handleInput = event => {
    const targetValue = event.target.value

    setInput(targetValue)
    clearTimeout(timeoutID)

    dispatch(saveSearchedQuery(targetValue))

    if (targetValue) {
      const timeout = setTimeout(() => {
        history.push('/search')
        dispatch(saveSearchedPosts(targetValue))
      }, 300)
      setTimeoutID(timeout)
    }
  }
  const notify = () => toast("Can't search while post is creating/editing")

  return (
    <div className="search-box" onClick={disableInput && notify}>
      <input
        className="search-box__input"
        type="text"
        placeholder="Search"
        value={input}
        disabled={disableInput}
        onChange={handleInput}
      />

      <SearchIcon className="search-box__icon" />
    </div>
  )
}

export default Search
