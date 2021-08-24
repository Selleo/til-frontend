import React from 'react'
import { useHistory } from 'react-router-dom'
import { useQuery } from '../utils'

import LogInButton from '../components/LogInButton'
import { saveHash } from '../utils/temporaryReviewHash'

const CheckIfCanReview = () => {
  const history = useHistory()
  const query = useQuery()
  const hash = query.get('hashed_id')

  if (!hash || hash.length < 200) {
    history.push('/')
  }

  const handleClick = () => {
    saveHash(hash)
  }

  return (
    <div className="check-if-can-review-container">
      <LogInButton
        className="log-in-btn"
        text="Log in for review"
        handleClick={handleClick}
      />
    </div>
  )
}

export default CheckIfCanReview
