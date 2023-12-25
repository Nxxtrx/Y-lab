import React, { memo, useState, useMemo, useRef, useEffect } from 'react'
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
import findLastComment from '../../utils/find-last-child';
import { useNavigate } from 'react-router-dom';

function CommentsList({id}) {
  const dispatch = useDispatch()

  useInit(() => {
    dispatch(commentsAction.load(id, true))
  }, [id])

  const scrollToFromRef = useRef(null)
  const [openFormId, setOpenFormId] = useState(null);
  const [openedComment, setOpenCommend] = useState([])
  const navigate = useNavigate()

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
        {id: item._id, author: item.author, text: item.text, date: item.dateCreate, level: level - 1, children: item.children}
      )).slice(1)
    ]), [selectRedux.comments]),
  };

  useEffect(() => {
    const itemVisible = scrollToFromRef.current?.getBoundingClientRect()
    if(itemVisible && (itemVisible.bottom < 0 || itemVisible.top > window.innerHeight)){
      window.scrollTo({
        top: scrollToFromRef.current?.offsetTop - (window.innerHeight * (50 / 100)+ (itemVisible.height / 2) ),
        behavior: 'smooth',
      });
    }
  }, [openFormId]);

  const openForm = (formId, commentData) => {
    setOpenCommend(commentData)
    const lastChild = findLastComment(commentData);
    setOpenFormId(lastChild._id || formId);
  };

  const closeForm = () => {
    setOpenFormId(null);
  };

  const handleSubmit = (idArticle, idComments, text) => {
    dispatch(commentsAction.postComments(idArticle, idComments, text, select.user.profile.name))
  }

  const onSignIn = () => {
    navigate('/login', {state: {back: location.pathname}});
  }


  return (
    <Spinner active={selectRedux.waiting}>
    <CommentsLayout title='Комментарии' count={selectRedux.count}>
      {options.comments.map((item) => (
        <React.Fragment key={item.id}>
          <Comments
            comments={item}
            isOpen={openFormId === item.id}
            openForm={() => openForm(item.id, item)}
            closeForm={closeForm}
            handleSubmit={handleSubmit}
            token={select.token}
            user={select.user}
            current={openedComment}
            scrollToFromRef={scrollToFromRef}
            onSignIn={onSignIn}
          />
        </React.Fragment>
      ))}
        {select.token && !openFormId
          ? <CommentsForm title= {'Новый комментарий'} dispatch={dispatch} idArticle={id} handleSubmit={handleSubmit}/>
          : (!openFormId && <CheckAuth onSignIn={onSignIn}/>)
        }
      </CommentsLayout>
  </Spinner>
  )
}

export default memo(CommentsList)