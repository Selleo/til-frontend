import React from 'react'

const LogoSelleo = ({ className }) => (
  <a
    href="https://selleo.com/blog"
    rel="noopener noreferrer"
    target="_blank"
    className={`${className} -selleo-logo`}
  >
    <img
      src={`${process.env.PUBLIC_URL}/assets/images/logo.svg`}
      alt="Selleo logo"
    />
  </a>
)

export default LogoSelleo
