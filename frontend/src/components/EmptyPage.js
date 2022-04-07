import React from 'react'

import NothingFoundImage from '../assets/images/nothing-found.svg'
import PropTypes from 'prop-types'

function EmptyPage(props) {
  const { heading, firstLine, secondLine, ctaComponent } = props
  return (
    <div className="empty-page">
      <img src={NothingFoundImage} alt="alt" />
      {heading && <h1>{heading}</h1>}
      {firstLine && <p>{firstLine}</p>}
      {secondLine && <p>{secondLine}</p>}
      {ctaComponent && (
        <div className="empty-page__cta-wrapper">{ctaComponent}</div>
      )}
    </div>
  )
}

EmptyPage.defaultProps = {
  heading: 'Nothing here.',
}

EmptyPage.propTypes = {
  ctaComponent: PropTypes.element,
  firstLine: PropTypes.string,
  heading: PropTypes.string,
  secondLine: PropTypes.string,
}

export default EmptyPage
