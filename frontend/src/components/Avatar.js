import React from 'react'
import PropTypes from 'prop-types'
import { ReactComponent as UserIcon } from '../assets/icons/user_outlined.svg'

const Avatar = ({ imageUrl }) => {
  return imageUrl ? (
    <img src={imageUrl} className="user__image" alt="author-img" />
  ) : (
    <UserIcon className="user__image" fill="#A0A0A0" />
  )
}

export default Avatar

Avatar.protoType = { imageUrl: PropTypes.string }
