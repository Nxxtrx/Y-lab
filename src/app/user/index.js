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
import Spinner from '../../components/spinner';

function User() {

  const store = useStore();

  const select = useSelector(state => ({
    data: state.auth.data,
    user: state.user.user,
    access: state.auth.access,
    waiting: state.user.waiting
  }))

  useInit(() => {
    store.actions.user.load(select.data.id);
  }, [select.data.id]);

  const callbacks = {
    signOut: useCallback(() => store.actions.auth.signOut())
  }

  const {t} = useTranslate();

  return (
    <PageLayout>
      <UserLayout isAuth={select.access} userName={select.data.userName} signOut={callbacks.signOut} t={t}/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={select.waiting}>
        <UserInfo user={select.user} t={t}/>
      </Spinner>
    </PageLayout>
  );
}

export default memo(User);