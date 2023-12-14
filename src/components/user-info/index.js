import React from 'react'
import './style.css'

export default function UserInfo({user}) {
  return (
    <div className='user-info'>
      <p className='user-info__title'>Профиль</p>
      <p>Имя: <span className='user-info__data'>{user.userName}</span></p>
      <p>Телефон: <span className='user-info__data'>{user.phone}</span></p>
      <p>email: <span className='user-info__data'>{user.email}</span></p>
    </div>
  )
}
