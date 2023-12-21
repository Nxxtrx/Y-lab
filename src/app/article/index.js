import {memo, useCallback, useMemo} from 'react';
import {useParams} from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import Spinner from '../../components/spinner';
import ArticleCard from '../../components/article-card';
import LocaleSelect from '../../containers/locale-select';
import TopHead from '../../containers/top-head';
import {useDispatch, useSelector} from 'react-redux';
import shallowequal from 'shallowequal';
import articleActions from '../../store-redux/article/actions';
import commentsAction from '../../store-redux/comments/actions';
import Comments from '../../components/comments';
import treeToList from '../../utils/tree-to-list';
import listToTree from '../../utils/list-to-tree';
import CommentsList from '../../containers/comments-list';

function Article() {
  const store = useStore();

  const dispatch = useDispatch();
  // Параметры из пути /articles/:id

  const params = useParams();

  useInit(() => {
    //store.actions.article.load(params.id);
    dispatch(commentsAction.load(params.id))
    dispatch(articleActions.load(params.id));
  }, [params.id]);

  const select = useSelector(state => ({
    article: state.article.data,
    waiting: state.article.waiting,
    comments: state.comments.data.items || [],
    count: state.comments.data.count,
    waitingComments: state.comments.waiting
  }), shallowequal); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  const {t} = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
  }

  const options = {
    comments: useMemo(() => ([
      ...treeToList(listToTree(select.comments), (item, level) => (
        {id: item._id, author: item.author, text: item.text, date: item.dateCreate, level: level - 1}
      )).slice(1)
    ]), [select.comments]),
  };

  return (
    <PageLayout>
      <TopHead/>
      <Head title={select.article.title}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={select.waitingComments}>
        <ArticleCard article={select.article} onAdd={callbacks.addToBasket} t={t}/>
        <CommentsList comments={options.comments} id={params.id} count={select.count}/>
      </Spinner>
    </PageLayout>
  );
}

export default memo(Article);
