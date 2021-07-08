import React from 'react'
import { socialMedia } from '../utils/sociaMedia'

const Footer = () => (
  <div className="footer">
    <ul className="social-links">
      {socialMedia.map(({ id, name, href, svg }) => {
        return (
          <li key={id}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`social-links__link -${name}`}
            >
              {svg}
            </a>
          </li>
        )
      })}
    </ul>
    <div className="footer__logo">
      <div className="logo">
        <a
          href="https://selleo.com/blog"
          rel="noopener noreferrer"
          target="_blank"
        >
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/logo.svg`}
            alt="Selleo logo"
          />
        </a>
      </div>
    </div>
  </div>
)

export default Footer
