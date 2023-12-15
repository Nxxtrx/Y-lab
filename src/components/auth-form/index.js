import React, { useEffect, useState, memo } from 'react'
import './style.css'
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function AuthForm(props) {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    login: '',
    password: ''
  })

  useEffect(() => {
    if(!props.error && props.data.userName) {
      navigate('/')
    }
  }, [props.error, props.data, onSubmit])

  const onSubmit = (e) => {
    e.preventDefault()
    const {login, password} = formData
    props.onSignIn(login, password)
  }

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  return (
    <div className="auth-form">
      <p className='auth-form__title'>{props.title}</p>
      <form className='auth-form__form' onSubmit={onSubmit}>
        <label className='auth-form__label'>{props.t('auth.login')}<br />
          <input className='auth-form__input' type='text' name='login' value={formData.login} onChange={handleChange}/>
        </label>
        <label  className='auth-form__label'>{props.t('auth.password')}<br />
          <input  className='auth-form__input' type='password' name='password' value={formData.password} onChange={handleChange}/>
        </label>
        <span className='auth-form__error'>{props.error}</span>
        <button type='submit' className='auth-form__btn'>{props.t('auth.submit')}</button>
      </form>
    </div>
  );
}

AuthForm.propTypes = {
  title: PropTypes.string,
  error: PropTypes.string,
  t: PropTypes.func
}

AuthForm.defaultProps = {
  t: (text) => text
}


export default memo(AuthForm)
