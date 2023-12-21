import React, { useState } from 'react'
import './style.css'
import CommentsForm from '../comments-form'
import CheckAuth from '../check-auth'
import { dateСonversion } from '../../utils/date-transformation'

export default function Comments({ comments, isOpen, openForm, closeForm, handleSubmit, token}) {

  return (
    <li className='comments__item' key={comments.id} style={{marginLeft: `${comments.level*20}px`}}>
      <p className='comments__user'>{comments.author.profile.name}<span className='comments__time'>{dateСonversion(comments.date)}</span></p>
      <p className='comments__text'>{comments.text}</p>
      <button onClick={isOpen ? closeForm : openForm} className='comments__btn'>Ответить</button>
      {token ? (isOpen && <CommentsForm title={'Новый ответ'} closeForm={closeForm} handleSubmit={handleSubmit} idComments={comments.id} level={comments.level}/>) :(isOpen && <CheckAuth comment={true} closeForm={closeForm}/>)}
    </li>

  )
}
