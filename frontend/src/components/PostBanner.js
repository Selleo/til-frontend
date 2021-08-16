import React from 'react'
import { categoryStatementMap } from '../utils/maps'
import LogoSelleo from './LogoSelleo'

const PostBanner = props => {
  const { postCategory } = props
  const { name, url } = postCategory

  if (!url) {
    return null
  }

  return (
    <div className="post-banner">
      <header className="post-banner__header">
        <img
          className="post-banner__bg"
          src={`${process.env.PUBLIC_URL}/assets/images/banner-bg.svg`}
          alt="banner"
        />

        <LogoSelleo className="post-banner__logo" />

        <div className="post-banner__headers">
          <h3>{categoryStatementMap.get(name).textFirst}</h3>
          <h3>{categoryStatementMap.get(name).textSecond}</h3>
        </div>

        <a
          href={url}
          rel="noopener noreferrer"
          target="_blank"
          className="post-banner__learn-more"
        >
          learn more
        </a>
      </header>
    </div>
  )
}

export default PostBanner
