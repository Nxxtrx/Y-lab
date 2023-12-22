import React, { useState } from 'react'
import PropTypes from 'prop-types';
import './style.css'

export default function CommentsForm({title, closeForm, idArticle, idComments, handleSubmit, level}) {
  const [text, setText] = useState('')

  const handleSubmitForm = (e) => {
    e.preventDefault()
    handleSubmit(idArticle, idComments, text, level)
    setText('')
    if(idComments){
      closeForm()
    }
  }

  return (
    <form className='comment-form comments-form_type_answer' onSubmit={handleSubmitForm}>
      <label>{title}
        <textarea className='comment-form__area' placeholder='Текст' value={text} onChange={(e)=>setText(e.target.value)}></textarea>
      </label>
      <button type='submit'>Отправить</button>
      {!idArticle && <button className='comments-form__btn-close' onClick={closeForm} type='btn'>Отмена</button>}
    </form>
  )
}

CommentsForm.propTypes = {
  title: PropTypes.string,
  closeForm: PropTypes.func,
  idArticle: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  idComments: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handleSubmit: PropTypes.func,
  level: PropTypes.number
};

CommentsForm.defaultProps = {
  closeForm: () => {},
  handleSubmit:(idArticle, idComments, text, level) => {}
}