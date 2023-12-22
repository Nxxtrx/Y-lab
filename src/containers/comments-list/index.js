import React, { memo, useState, useMemo } from 'react'
import Comments from '../../components/comments'
import CommentsForm from '../../components/comments-form'
import commentsAction from '../../store-redux/comments/actions';
import { useDispatch } from 'react-redux';
import useSelector from '../../hooks/use-selector';
import { useSelector as useSelectorRedux } from 'react-redux';
import CheckAuth from '../../components/check-auth';
import useInit from '../../hooks/use-init';
import treeToList from '../../utils/tree-to-list';
import listToTree from '../../utils/list-to-tree';
import Spinner from '../../components/spinner';
import CommentsLayout from '../../components/comments-layout';

function CommentsList({id}) {
  const dispatch = useDispatch()

  useInit(() => {
    dispatch(commentsAction.load(id, true))
  }, [id])

  const select = useSelector(state => ({
    token: state.session.token,
    user: state.session.user,
  }))

  const selectRedux = useSelectorRedux(state => ({
    comments: state.comments.data.items || [],
    count: state.comments.data.count,
    waiting: state.comments.waiting
  }))

  const options = {
    comments: useMemo(() => ([
      ...treeToList(listToTree(selectRedux.comments), (item, level) => (
        {id: item._id, author: item.author, text: item.text, date: item.dateCreate, level: level - 1}
      )).slice(1)
    ]), [selectRedux.comments]),
  };


  const [openFormId, setOpenFormId] = useState(null);

  const openForm = (formId) => {
    setOpenFormId(formId);
  };

  const closeForm = () => {
    setOpenFormId(null);
  };

  const handleSubmit = (idArticle, idComments, text) => {
    dispatch(commentsAction.postComments(idArticle, idComments, text)).then((res) => dispatch(commentsAction.load(id, false)))

  }


  return (
    <Spinner active={selectRedux.waiting}>
      <CommentsLayout title='Комментарии' count={selectRedux.count}>
        {options.comments.map((item =>
          <Comments
            key={item.id}
            comments={item}
            isOpen={openFormId === item.id}
            openForm={() => openForm(item.id)}
            closeForm={closeForm}
            handleSubmit={handleSubmit}
            token={select.token}
            user={select.user}
          />
        ))}
        {select.token && !openFormId
          ? <CommentsForm title= {'Новый комментарий'} dispatch={dispatch} idArticle={id} handleSubmit={handleSubmit}/>
          : (!openFormId && <CheckAuth/>)
        }
      </CommentsLayout>

  </Spinner>
  )
}

export default memo(CommentsList)