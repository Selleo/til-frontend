import React from 'react'

const LogInButton = props => {
  const { REACT_APP_API_URL: API_URL } = process.env
  const { className, text, handleClick } = props

  const linkText = text ? text : 'log in'

  return (
    <a
      className={className}
      onClick={handleClick}
      href={`${API_URL}/auth/google`}
    >
      {linkText}
    </a>
  )
}
export default LogInButton
