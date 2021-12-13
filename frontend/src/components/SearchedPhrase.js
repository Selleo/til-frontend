import React from 'react'
import PropTypes from 'prop-types'

const SearchedPhrase = ({ phrase }) => {
  return (
    <p>
      Searched phrase:{' '}
      <b>
        <small>{phrase}</small>
      </b>
    </p>
  )
}

SearchedPhrase.propTypes = {
  phrase: PropTypes.string.isRequired,
}

export default SearchedPhrase
