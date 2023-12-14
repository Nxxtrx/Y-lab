import React, { useCallback } from 'react'
import useTranslate from "../../hooks/use-translate";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import AuthForm from '../../components/auth-form';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import UserLayout from '../../components/user-layout';

export default function Authorization() {

  const store = useStore()

  const select = useSelector(state => ({
    data: state.auth.data
  }))

  const callbacks = {
    onSignIn: useCallback((login, password) => store.actions.auth.signIn(login, password))
  }

  const {t} = useTranslate();
  return (
    <PageLayout>
      <UserLayout />
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <AuthForm title='Вход' onSignIn={callbacks.onSignIn} data={select.data} error={select.data.message}/>
    </PageLayout>
  );
}
