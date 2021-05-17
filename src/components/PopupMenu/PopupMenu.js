import React from 'react';
import './PopupMenu.css';
import successLogo from '../../images/successimage.png';
import failLogo from '../../images/failimage.png';

function PopupMenu({ isOpen, onClose, isolatePopup, status, infoMessage }) {
  return (
    <div className={`popup ${isOpen && 'popup_opened'}`} id='popup__info' onClick={onClose}>
      <div className='popup__container' onClick={isolatePopup}>
        <button className='popup__button-close' id='info__button-close' type='button' onClick={onClose} />
          {status
            ? <img src={successLogo} alt='Успешно' className='popup__status' />
            : <img src={failLogo} alt='Ошибка' className='popup__status' />
          }
        <h2 className='popup__status-title'>
          {infoMessage}
        </h2>
      </div>
    </div>
  )
}

export default PopupMenu;