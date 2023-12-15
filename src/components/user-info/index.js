import React, {memo} from 'react'
import PropTypes from "prop-types";
import './style.css'

function UserInfo({user, t}) {
  return (
    <div className='user-info'>
      <p className='user-info__title'>{t('user.title')}</p>
      <p className='user-info__description'>{t('user.name')}: <span className='user-info__data'>{user.userName}</span></p>
      <p className='user-info__description'>{t('user.phone')}: <span className='user-info__data'>{user.phone}</span></p>
      <p className='user-info__description'>email: <span className='user-info__data'>{user.email}</span></p>
    </div>
  )
}

UserInfo.propTypes = {
  user: PropTypes.shape({
    userName: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  t: PropTypes.func
}

UserInfo.defaultProps = {
  t: (text) => text
}

export default memo(UserInfo)
