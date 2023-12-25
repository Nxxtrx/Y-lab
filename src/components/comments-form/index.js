import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types';
import './style.css'

const  CommentsForm = ({title, closeForm, idArticle, idComments, handleSubmit, level, scrollToFromRef}) => {
  const [text, setText] = useState('')
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    if(!(text.trim() === '') && text.length >= 1){
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  }, [text])

  const handleSubmitForm = (e) => {
    e.preventDefault()
    handleSubmit(idArticle, idComments, text.trim(), level)
    setText('')
    if(idComments){
      closeForm()
    }

  }

  return (
    <form ref={scrollToFromRef} className='comment-form comments-form_type_answer' onSubmit={handleSubmitForm} style={idComments ? (level <= 6 ? { marginLeft: `${(level + 1) * 30}px` }: { marginLeft: `${6 * 30}px`}): {}} >
      <label>{title}
        <textarea  className='comment-form__area' placeholder='Текст' value={text} onChange={(e)=>setText(e.target.value)} ></textarea>
      </label>
      <button type='submit' disabled={!isValid}>Отправить</button>
      {!idArticle && <button className='comments-form__btn-close' onClick={closeForm}  type='btn'>Отмена</button>}
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

export default CommentsForm