import {memo, useCallback, useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import Spinner from "../../components/spinner";
import ArticleCard from "../../components/article-card";
import LocaleSelect from "../../containers/locale-select";
import UserLayout from '../../components/user-layout';

/**
 * Страница товара с первичной загрузкой товара по id из url адреса
 */
function Article() {
  const store = useStore();

  // Параметры из пути /articles/:id
  const params = useParams();

  useInit(() => {
    store.actions.article.load(params.id);
  }, [params.id]);

  const[isAuth, setIsAuth] = useState(false)



  const select = useSelector(state => ({
    article: state.article.data,
    waiting: state.article.waiting,
    user: state.auth.data
  }));

  const {t} = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    signOut: useCallback(() => store.actions.auth.signOut())
  }

  useEffect(() => {
    if(localStorage.getItem('token') && !select.user.error){
      setIsAuth(true)
    } else {
      setIsAuth(false)
    }
  }, [store, callbacks.signOut])

  return (
    <PageLayout>
      <UserLayout isAuth={isAuth} userName={select.user.userName} signOut={callbacks.signOut} t={t}/>
      <Head title={select.article.title}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={select.waiting}>
        <ArticleCard article={select.article} onAdd={callbacks.addToBasket} t={t}/>
      </Spinner>
    </PageLayout>
  );
}

export default memo(Article);
