import React from 'react';
import './Login.css';
import WelcomeScreen from '../WelcomeScreen/WelcomeScreen';
import AuthForm from '../AuthForm/AuthForm';

function Login({onLogin, isLoading}) {
  return (
    <main className='login'>
      <WelcomeScreen title='Рады видеть!' />
      <AuthForm
        buttonText={isLoading ? 'Вход...' : 'Войти'}
        descriptionMessage='Ещё не зарегистрированы?'
        formId='login'
        linkMessage='Регистрация'
        onLogin={onLogin}
      />
    </main>
  )
}

export default Login;