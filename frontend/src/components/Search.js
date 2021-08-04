import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { saveSearchedPosts, saveSearchedQuery } from '../store/actions/actions'
import { useOnRouteLeave } from '../utils/customHooks/useOnRouteLeave'
import { ReactComponent as SearchIcon } from '../assets/icons/search.svg'
import { useDisableOnRoute } from '../utils/customHooks/useDisableOnRoute'
import ActionModal from './ActionModal'
import { Transition } from './Transition'

const Search = () => {
  const [input, setInput] = useState('')
  const [timeoutID, setTimeoutID] = useState(null)
  const dispatch = useDispatch()
  const history = useHistory()
  const hasLeavedRoute = useOnRouteLeave('/search')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { isDisabled } = useDisableOnRoute(['add', 'edit'])

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
    } else {
      history.push('/')
    }
  }

  const handleClick = e => {
    if (isDisabled) {
      e.preventDefault()
      setIsModalOpen(true)
    }
  }

  return (
    <>
      <Transition name="search-animation">
        <div className="search-box" onClick={handleClick}>
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
      </Transition>
      {isModalOpen && (
        <ActionModal
          action={() => history.push('/')}
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          message="If you leave, you will lose your data!"
        />
      )}
    </>
  )
}

export default Search
