import React from 'react'

import { socialMedia } from '../utils/sociaMedia'

const Footer = () => (
  <div className="footer">
    <ul className="social-links">
      {socialMedia.map(({ id, name, href, svg }) => (
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
      ))}
    </ul>
  </div>
)

export default Footer
