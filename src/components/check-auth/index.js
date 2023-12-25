import React, { useCallback } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './style.css'

export default function CheckAuth({comment, closeForm, scrollToFromRef, level, onSignIn}) {

  return (
    <p className='check-auth' ref={scrollToFromRef} style={comment ? (level <= 6 ? { marginLeft: `${(level + 1) * 30}px` }: { marginLeft: `${6 * 30}px`}): {}}>
      <button className="check-auth__link" onClick={onSignIn}>Войдите</button>
      , чтобы иметь возможность комментировать.
      {comment && <button className='check-auth__btn' onClick={closeForm}>Отмена</button>}
    </p>
  )
}
