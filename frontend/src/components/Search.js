import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { debounce } from 'lodash'

import { saveSearchedQuery } from '../store/actions/actions'
import { useOnRouteLeave } from '../utils/customHooks/useOnRouteLeave'
import { ReactComponent as SearchIcon } from '../assets/icons/search.svg'
import Icon from './UI/Icon'
import { useDisableOnRoute } from '../utils/customHooks/useDisableOnRoute'
import ActionModal from './ActionModal'
import { Transition } from './Transition'
import { useSearchQuery } from '../utils/customHooks/useSearchQuery'

const Search = () => {
  const dispatch = useDispatch()

  const [input, setInput] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { isDisabled } = useDisableOnRoute(['add', 'edit'])
  const hasLeftRoute = useOnRouteLeave('/search')
  const searchQuery = useSearchQuery()
  const history = useHistory()

  const debouncedHistoryPush = useMemo(
    () => debounce(history.push, 400),
    [history]
  )

  useEffect(() => {
    if (searchQuery) {
      setInput(searchQuery)
    }
  }, [])

  const handleClearInput = useCallback(() => {
    dispatch(saveSearchedQuery(''))
    setInput('')
    history.push('/')
  }, [dispatch, history])

  useEffect(() => {
    if (hasLeftRoute) {
      dispatch(saveSearchedQuery(''))
      setInput('')
    }
  }, [hasLeftRoute, handleClearInput])

  const handleInput = event => {
    const searchedValue = event.target.value
    setInput(searchedValue)

    if (searchedValue) {
      debouncedHistoryPush(`/search?q=${searchedValue}`)
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

  const InputIcon = () => {
    return input ? (
      <div
        className="search-box__icon -cancel"
        onClick={handleClearInput}
        title="Clear"
      >
        <Icon name="cancel" />
      </div>
    ) : (
      <SearchIcon className="search-box__icon" />
    )
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
          <InputIcon />
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
