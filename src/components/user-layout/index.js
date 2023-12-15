import React, {memo} from 'react'
import PropTypes from "prop-types";
import './style.css'
import { Link, useNavigate } from 'react-router-dom'

function UserLayout({userName, isAuth, signOut, t}) {
  const navigate = useNavigate()

  const onSignOut = () => {
    signOut()
    navigate('/')
  }

  console.log(isAuth)

  return (
    <div className='user-layout'>
      {userName ? <Link to={isAuth ? `/profile` : '/login'} className='user-layout__name'>{userName}</Link> : '' }
      {isAuth
        ? <button className='user-layout__btn' onClick={() => onSignOut()}>{t('auth.signOut')}</button>
        : <button className='user-layout__btn' onClick={() => navigate('/login')}>{t('auth.signIn')}</button>
      }
    </div>
  )
}

UserLayout.propTypes = {
  userName: PropTypes.string,
  isAuth: PropTypes.bool,
  signOut: PropTypes.func,
  t: PropTypes.func
}

UserLayout.defaultProps = {
  signOut: () => {
  },
  t: (text) => text
}

export default memo(UserLayout)