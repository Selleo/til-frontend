import React from 'react'
import { socialMedia } from '../utils/sociaMedia'
import LogoSelleo from './LogoSelleo'

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
        <LogoSelleo />
      </div>
    </div>
  </div>
)

export default Footer
