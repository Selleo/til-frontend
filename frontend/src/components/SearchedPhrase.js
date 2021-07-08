import React from 'react'

const SearchedPhrase = props => {
  const { phrase } = props

  if (!phrase.length > 0) {
    return null
  }

  return (
    <p>
      Searched phrase:{' '}
      <b>
        <small>{phrase}</small>
      </b>
    </p>
  )
}

export default SearchedPhrase
