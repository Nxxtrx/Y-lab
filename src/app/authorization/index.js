import React, { useCallback, memo, useState, useEffect  } from 'react'
import useTranslate from "../../hooks/use-translate";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import AuthForm from '../../components/auth-form';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import UserLayout from '../../components/user-layout';
import {useLocation, useNavigate } from 'react-router-dom';

function Authorization() {

  const store = useStore()
  const navigate = useNavigate()

  const [error, setError] = useState('')

  const select = useSelector(state => ({
    data: state.auth.data,
    access: state.auth.access
  }))

  const callbacks = {
    onSignIn: useCallback((login, password) => store.actions.auth.signIn(login, password), [store.actions.auth])
  }

  useEffect(() => {
    if(!select.data.error && select.access) {
      navigate('/')
    }
    setError(select.data.error)
  }, [select.data.error, select.access, callbacks.onSignIn])

  useEffect(() => {
    setError('')
  }, [])

  const {t} = useTranslate();

  return (
    <PageLayout>
      <UserLayout t={t}/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <AuthForm title={t('auth.title')} onSignIn={callbacks.onSignIn} data={select.data} error={error} t={t}/>
    </PageLayout>
  );
}

export default memo(Authorization)