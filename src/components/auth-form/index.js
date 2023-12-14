import React, { useEffect, useState } from 'react'
import './style.css'
import useStore from '../../hooks/use-store';
import { useNavigate } from 'react-router-dom';

export default function AuthForm(props) {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    login: '',
    password: ''
  })

  useEffect(() => {
    if(!props.error && props.data.userName) {
      navigate('/')
    }
  }, [props.error, props.data])

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
        <label className='auth-form__label'>Логин<br />
          <input className='auth-form__input' type='text' name='login' value={formData.login} onChange={handleChange}/>
        </label>
        <label  className='auth-form__label'>Пароль<br />
          <input  className='auth-form__input' type='password' name='password' value={formData.password} onChange={handleChange}/>
        </label>
        <span>{props.error}</span>
        <button type='submit' className='auth-form__btn'>Войти</button>
      </form>
    </div>
  );
}
