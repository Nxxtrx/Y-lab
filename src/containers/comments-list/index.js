import React, { memo, useCallback, useEffect, useState } from 'react'
import Comments from '../../components/comments'
import CommentsForm from '../../components/comments-form'
import commentsAction from '../../store-redux/comments/actions';
import { useDispatch } from 'react-redux';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import CheckAuth from '../../components/check-auth';
import useInit from '../../hooks/use-init';

function CommentsList({comments, id, count}) {
  const store = useStore()

  const select = useSelector(state => ({
    token: state.session.token
  }))
  const dispatch = useDispatch()

  const [openFormId, setOpenFormId] = useState(null);

  const openForm = (formId) => {
    setOpenFormId(formId);
  };

  const closeForm = () => {
    setOpenFormId(null);
  };

  const handleSubmit = (idArticle, idComments, text, level,) => {
    dispatch(commentsAction.postComments(idArticle, idComments, text))
    dispatch(commentsAction.load(id))
  }


  return (
    <div className='comments'>
      <p className='comments__title'>Комментарии ({count})</p>
      <ul className='comments__list'>
        {comments.map((item =>
          <Comments key={item.id} comments={item} isOpen={openFormId === item.id} openForm={() => openForm(item.id)} closeForm={closeForm} handleSubmit={handleSubmit} token={select.token}/>
        ))}
      </ul>
      {select.token && !openFormId ? <CommentsForm title= {'Новый комментарий'} dispatch={dispatch} idArticle={id} handleSubmit={handleSubmit}/> : (!openFormId && <CheckAuth/>)}
    </div>
  )
}

export default memo(CommentsList)