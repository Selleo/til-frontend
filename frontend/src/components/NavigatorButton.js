import React from 'react'

import Icon from './UI/Icon'

const NavigatorButton = ({ action, text }) => (
  <div className="navigator-button">
    <button onClick={action} className="navigator-button__link">
      <Icon name="arrowleft" />
      <span className="navigator-button__text">{text}</span>
    </button>
  </div>
)

export default NavigatorButton
