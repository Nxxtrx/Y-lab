import React, { useState } from 'react'
import commentsAction from '../../store-redux/comments/actions';
import './style.css'



export default function CommentsForm({title, closeForm, dispatch, idArticle, idComments, handleSubmit, level}) {
  const [text, setText] = useState('')

  const handleSubmitForm = (e) => {
    e.preventDefault()
    handleSubmit(idArticle, idComments, text, level)
    // setText('')
    // closeForm()
  }

  return (
    <form className='comment-form comments-form_type_answer' onSubmit={handleSubmitForm}>
      <label>{title}
        <textarea className='comment-form__area' placeholder='Текст' value={text} onChange={(e)=>setText(e.target.value)}></textarea>
      </label>
      <button type='submit'>Отправить</button>
      {closeForm && <button className='comments-form__btn-close' onClick={closeForm} type='btn'>Отмена</button>}
    </form>
  )
}
