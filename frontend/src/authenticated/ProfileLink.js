import Link from 'next/link'
import Icon from '../components/UI/Icon'

const ProfileLink = () => {
  return (
    <Link href="/profile">
      <a className="profile-link">
        <Icon name="profile" />
        <span className="profile-link__text">Profile</span>
      </a>
    </Link>
  )
}

export default ProfileLink
