import React from 'react'

import NothingFoundImage from '../assets/images/nothing-found.svg'

const NothingFound = ({ text }) => (
  <div className="nothing-found-wrapper">
    <img src={NothingFoundImage} alt="alt" />
    {text ? (
      <p>
        Nothing found with phrase:{' '}
        <b>
          <small>{text}</small>
        </b>
      </p>
    ) : (
      <p>Nothing found</p>
    )}
  </div>
)

export default NothingFound
