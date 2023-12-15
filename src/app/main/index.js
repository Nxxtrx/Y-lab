import {memo, useCallback, useEffect, useState} from 'react';
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import LocaleSelect from "../../containers/locale-select";
import UserLayout from '../../components/user-layout';
import useSelector from '../../hooks/use-selector';

/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {

  const store = useStore();

  const[isAuth, setIsAuth] = useState(false)

  useInit(() => {
    store.actions.catalog.initParams();
    if(localStorage.getItem('token')){
      store.actions.auth.tokenCheck()
    }
  }, [], true);


  const select = useSelector(state => ({
    user: state.auth.data
  }))


  const callbacks = {
    signOut: useCallback(() => store.actions.auth.signOut())
  }

  useEffect(() => {
    if(localStorage.getItem('token') && !select.user.error){
      setIsAuth(true)
    } else {
      setIsAuth(false)
    }
  }, [store, callbacks.signOut])

  const {t} = useTranslate();

  return (
    <PageLayout>
      <UserLayout isAuth={isAuth} userName={select.user.userName} signOut={callbacks.signOut} t={t}/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <CatalogFilter/>
      <CatalogList/>
    </PageLayout>
  );
}

export default memo(Main);
