import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { saveSearchedPosts, saveSearchedQuery } from '../store/actions/actions'
import { useOnRouteLeave } from '../utils/customHooks/useOnRouteLeave'
import { ReactComponent as SearchIcon } from '../assets/icons/search.svg'
import { useModalWithActionOnRoute } from '../utils/customHooks/useModalWithActionOnRoute'

const Search = () => {
  const [input, setInput] = useState('')
  const [timeoutID, setTimeoutID] = useState(null)
  const dispatch = useDispatch()
  const history = useHistory()
  const hasLeavedRoute = useOnRouteLeave('/search')
  const {
    isDisabled,
    triggerActionModal,
    ActionModal,
  } = useModalWithActionOnRoute(
    ['add', 'edit'],
    "Can't search while post is creating/editing, you will lose your data",
    () => history.push('/')
  )

  useEffect(() => {
    if (!input && history.location.pathname !== '/review-posts') {
      history.push('/')
    }
  }, [input, history])

  useEffect(() => {
    if (hasLeavedRoute) {
      dispatch(saveSearchedQuery(''))
      setInput('')
    }
  }, [hasLeavedRoute, dispatch])

  const handleInput = event => {
    const targetValue = event.target.value

    setInput(targetValue)
    clearTimeout(timeoutID)

    if (targetValue) {
      const timeout = setTimeout(() => {
        history.push('/search')

        dispatch(saveSearchedPosts(targetValue))
      }, 300)
      setTimeoutID(timeout)
    }
  }

  return (
    // <div className="search-box" onClick={notifyMessage || null}>
    <>
      <div className="search-box" onClick={triggerActionModal}>
        <input
          className="search-box__input"
          type="text"
          placeholder="Search"
          value={input}
          disabled={isDisabled}
          onChange={handleInput}
        />

        <SearchIcon className="search-box__icon" />
      </div>
      <ActionModal />
    </>
  )
}

export default Search
