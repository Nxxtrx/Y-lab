import React from 'react'
import './style.css'
import { Link, useNavigate } from 'react-router-dom'

export default function UserLayout({userName, isAuth, signOut}) {
  const navigate = useNavigate()

  const onSignOut = () => {
    signOut()
    navigate('/')
  }

  return (
    <div className='user-layout'>
      {userName ? <Link to='/profile'>{userName}</Link> : '' }
      {isAuth
        ? <button className='user-layout__btn' onClick={() => onSignOut()}>Выход</button>
        : <button className='user-layout__btn' onClick={() => navigate('/login')}>Вход</button>
      }
    </div>
  )
}
