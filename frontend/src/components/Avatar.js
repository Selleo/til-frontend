import React from 'react'
import PropTypes from 'prop-types'
import { ReactComponent as UserIcon } from '../assets/icons/avatar.svg'

const Avatar = ({ imageUrl, background = 'dark' }) => {
  return imageUrl ? (
    <img src={imageUrl} className="user__image" alt="author-img" />
  ) : (
    <div className={`user__image -background-${background}`}>
      <UserIcon className="user__icon" />
    </div>
  )
}

export default Avatar

Avatar.protoType = {
  imageUrl: PropTypes.string,
  background: PropTypes.oneOf[('light', 'dark')],
}
