import { Link } from 'react-router-dom';
import './Header.css';
import logo from "../../images/logo.svg";
import userLogo from '../../images/user-icon.svg'

function Header() {

    function handleClick() {
        // Временно, чтобы работало открытие меню
        document.querySelector(".popup").classList.add("popup_opened");
      }

    return (
      <header className="header">
        <Link to="/">
          <div className="header__logo">
            <img alt="лого" src={logo} />
          </div>
        </Link>
        <div className="header__flex-container">
        <div className="header__menu">
          <div className="header__container">
            <Link to="/movies" className="header__account">
              Фильмы
            </Link>
            <Link to="/saved-movies" className="header__account">
              Сохраненные фильмы
            </Link>
          </div>
        </div>
        <div className="header__container">
          <Link to="/profile" className="header__account">
            Аккаунт
          </Link>
          <Link to="/profile" className="header__link">
            <img src={userLogo} alt="иконка" className="header__icon" />
          </Link>
          </div>
          <button className="header__menu-button" onClick={handleClick} />
        </div>
      </header>
    );
  }

export default Header;