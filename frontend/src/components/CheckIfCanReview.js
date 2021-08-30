import React from 'react'
import { useHistory } from 'react-router-dom'
import { useQuery } from '../utils'

import LogInButton from '../components/LogInButton'

const CheckIfCanReview = () => {
  const history = useHistory()
  const query = useQuery()
  const hash = query.get('hashed_id')

  if (!hash || hash.length < 200) {
    history.push('/')
  }

  return (
    <div className="check-if-can-review-container">
      <LogInButton
        className="log-in-btn"
        text="Log in for review"
        callbackURL={`/review-posts?hashed_id=${hash}`}
      />
    </div>
  )
}

export default CheckIfCanReview
