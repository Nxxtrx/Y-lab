import React, { memo, useState } from 'react'
import './style.css'
import PropTypes from 'prop-types';
import CommentsForm from '../comments-form'
import CheckAuth from '../check-auth'
import { dateСonversion } from '../../utils/date-transformation'


function Comments({ comments, isOpen, openForm, closeForm, handleSubmit, token, user, current, scrollToFromRef, onSignIn}) {

  const {id, author, text, level, date} = comments

  return (
    <>
    <li className="comments__item" key={id} style={ level < 6 ? { marginLeft: `${level * 30}px` } : {marginLeft: `${6 * 30}px` }} >
      <p className={`comments__user ${user._id === author._id && 'comments__user_type_active'}`}>
        {author.profile.name}
        <span className="comments__time">{dateСonversion(date)}</span>
      </p>
      <p className="comments__text">{text}</p>
      <button onClick={openForm} className="comments__btn">Ответить</button>
    </li>
    {token
      ? isOpen && (
          <CommentsForm
            title={"Новый ответ"}
            closeForm={closeForm}
            handleSubmit={handleSubmit}
            idComments={current.id}
            level={current.level}
            scrollToFromRef={scrollToFromRef}
          />
        )
      : isOpen && <CheckAuth comment={true} closeForm={closeForm} scrollToFromRef={scrollToFromRef} level={current.level} onSignIn={onSignIn}/>}
    </>
  );
}

Comments.propTypes = {
  comments: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    author: PropTypes.object,
    text: PropTypes.string,
    level: PropTypes.number,
    date: PropTypes.string
  }).isRequired,
  isOpen: PropTypes.bool,
  openForm: PropTypes.func,
  closeForm: PropTypes.func,
  handleSubmit: PropTypes.func,
  token: PropTypes.string,
  user: PropTypes.object
};

Comments.defaultProps = {
  openForm: (id) => {},
  closeForm: () => {},
  handleSubmit:() => {}
}

export default memo(Comments)
