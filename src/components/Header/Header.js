import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';
import './Header.css';

function Header({loggedIn, windowWidth}) {
  const history = useHistory();

  function handleLogoClick() {
    history.push('/');
  }

  const pathname = useLocation().pathname;

  return (
    <header className={pathname === '/' ? 'header' : 'header header_white'}>
      <div className='header__container'>
        <img className='header__logo' src={logo} alt='Логотип сайта' onClick={handleLogoClick} />
        <Navigation
          loggedIn={loggedIn}
          windowWidth={windowWidth}
        />
      </div>
    </header>
  )
}

export default Header;