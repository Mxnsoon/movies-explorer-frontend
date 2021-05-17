import React from 'react';
import './Register.css';
import WelcomeScreen from '../WelcomeScreen/WelcomeScreen';
import AuthForm from '../AuthForm/AuthForm';

function Register({onRegister, isLoading}) {
  return (
    <main className='register'>
      <WelcomeScreen title='Добро пожаловать!' />
      <AuthForm
        buttonText={isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
        descriptionMessage='Уже зарегистрированы?'
        formId='register'
        linkMessage='Войти'
        onRegister={onRegister}
      />
    </main>
  )
}

export default Register;