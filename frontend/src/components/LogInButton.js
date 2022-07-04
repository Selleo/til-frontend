import React from 'react'

const LogInButton = props => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL

  const { className, text, callbackURL } = props

  const linkText = text || 'log in'
  const href = callbackURL
    ? `${API_URL}/auth/google?state=${callbackURL}`
    : `${API_URL}/auth/google`

  return (
    <a className={className} href={href}>
      {linkText}
    </a>
  )
}
export default LogInButton
