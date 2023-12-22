import React, { memo, useState } from 'react'
import './style.css'
import PropTypes from 'prop-types';
import CommentsForm from '../comments-form'
import CheckAuth from '../check-auth'
import { dateСonversion } from '../../utils/date-transformation'


function Comments({ comments, isOpen, openForm, closeForm, handleSubmit, token, user}) {

  const {id, author, text, level, date} = comments

  return (
    <li className="comments__item" key={id} style={{ marginLeft: `${level * 20}px` }} >
      <p className={`comments__user ${user._id === author._id && 'comments__user_type_active'}`}>
        {author.profile.name}
        <span className="comments__time">{dateСonversion(date)}</span>
      </p>
      <p className="comments__text">{text}</p>
      <button onClick={isOpen ? closeForm : openForm} className="comments__btn">Ответить</button>
      {token
        ? isOpen && (
            <CommentsForm
              title={"Новый ответ"}
              closeForm={closeForm}
              handleSubmit={handleSubmit}
              idComments={id}
              level={level}
            />
          )
        : isOpen && <CheckAuth comment={true} closeForm={closeForm} />}
    </li>
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
