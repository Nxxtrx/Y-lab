import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'

export default function CheckAuth({comment, closeForm}) {

  return (
    <p className='check-auth'>
      <Link className="check-auth__link" to={'/login'}>Войдите</Link>
      , чтобы иметь возможность комментировать.
      {comment && <button className='check-auth__btn' onClick={closeForm}>Отмена</button>}
    </p>
  )
}
