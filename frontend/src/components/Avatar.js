import PropTypes from 'prop-types'

const Avatar = ({ imageUrl, background = 'dark' }) => {
  return imageUrl ? (
    <img src={imageUrl} className="user__image" alt="author-img" />
  ) : (
    <div
      className={`user__image -background-${background}`}
      data-testid="avatar-without-image"
    >
      <img src="../assets/icons/avatar.svg" alt="" className="user__icon" />
    </div>
  )
}

export default Avatar

Avatar.protoType = {
  imageUrl: PropTypes.string,
  background: PropTypes.oneOf[('light', 'dark')],
}
