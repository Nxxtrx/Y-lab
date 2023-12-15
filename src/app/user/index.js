import {memo, useCallback, useEffect, useState} from 'react';
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import UserLayout from '../../components/user-layout';
import useSelector from '../../hooks/use-selector';
import UserInfo from '../../components/user-info';

function Main() {

  const store = useStore();

  const[isAuth, setIsAuth] = useState(false)

  useInit(() => {
    store.actions.auth.tokenCheck()
  }, [], true);

  useEffect(() => {
    if(localStorage.getItem('token')){
      setIsAuth(true)
    } else {
      setIsAuth(false)
    }
  })

  const select = useSelector(state => ({
    user: state.auth.data
  }))

  const callbacks = {
    signOut: useCallback(() => store.actions.auth.signOut())
  }


  const {t} = useTranslate();

  return (
    <PageLayout>
      <UserLayout isAuth={isAuth} userName={select.user.userName} signOut={callbacks.signOut} t={t}/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <UserInfo user={select.user} t={t}/>
    </PageLayout>
  );
}

export default memo(Main);