import React, { useState, useEffect, useCallback, useMemo } from 'react'
// import { useHistory } from 'react-router-dom'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { debounce } from 'lodash'

import { saveSearchedQuery } from '../store/actions/actions'
import { useOnRouteLeave } from '../utils/customHooks/useOnRouteLeave'

import Icon from './UI/Icon'
import { useDisableOnRoute } from '../utils/customHooks/useDisableOnRoute'
import ActionModal from './ActionModal'
import { Transition } from './Transition'
import { useSearchQuery } from '../utils/customHooks/useSearchQuery'

const Search = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const [input, setInput] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { isDisabled } = useDisableOnRoute(['add', 'edit'])
  const hasLeftRoute = useOnRouteLeave('/search')
  const searchQuery = useSearchQuery()

  const debouncedHistoryPush = useMemo(
    () => debounce(router.push, 400),
    [router]
  )

  useEffect(() => {
    if (searchQuery) {
      setInput(searchQuery)
    }
  }, [searchQuery])

  const handleClearInput = useCallback(() => {
    dispatch(saveSearchedQuery(''))
    setInput('')
    router.push('/')
  }, [dispatch, router])

  useEffect(() => {
    if (hasLeftRoute) {
      dispatch(saveSearchedQuery(''))
      setInput('')
    }
  }, [hasLeftRoute, handleClearInput, dispatch])

  const handleInput = event => {
    const searchedValue = event.target.value
    setInput(searchedValue)

    if (searchedValue) {
      debouncedHistoryPush(`/search?q=${searchedValue}`)
    } else {
      router.push('/')
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
      <img
        src="/public/assets/icons/search.svg"
        alt=""
        className="search-box__icon"
      />
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
          action={() => router.push('/')}
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          message="If you leave, you will lose your data!"
        />
      )}
    </>
  )
}

export default Search
