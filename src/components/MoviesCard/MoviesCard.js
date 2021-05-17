import React from 'react';
import './MoviesCard.css';
import { useLocation } from 'react-router-dom';
import moviePlaceholder from '../../images/movie-card-image-1.png'

function MoviesCard({data, handleSaveMovie, handleDeleteMovie}) {
  const [isShown, setIsShown] = React.useState(false);
  const location = useLocation().pathname;

  function handleSaveButtonDisactive() {
    setIsShown(false);
  }

  function handleSaveButtonActive() {
    setIsShown(true);
  }

  function handleSave() {
    handleSaveMovie(data);
  }

  function handleDelete() {
    handleDeleteMovie(data);
  }

  function handleImageClick() {
    location === '/movies'
    ? window.open(data.trailerLink, '_blank')
    : window.open(data.trailer, '_blank')
  }

  return (
    <li
      className='card'
      id={location === '/movies' ? data.id : data._id}
      onMouseOver={handleSaveButtonActive}
      onMouseOut={handleSaveButtonDisactive}
    >
      {location === '/saved-movies'
        ? <img
            className='card__image'
            src={data.image !== null ? data.image : moviePlaceholder}
            alt={data.nameRU}
            onClick={handleImageClick}
          />
        : <img
            className='card__image'
            src={data.image !== null ? `https://api.nomoreparties.co${data.image.url}` : moviePlaceholder}
            alt={data.nameRU}
            onClick={handleImageClick}
          />
      }
      <div className='card__container'>
        <p className='card__name'>{data.nameRU}</p>
        {(location === '/movies' && data.saved === true)
      &&
      <div className='card__saved' onClick={handleDelete} />}
      {(location === '/movies' && data.saved !== true)
      &&
      <button
        className={`card__save ${isShown && 'card__save_active'}`}
        type='button'
        onClick={handleSave}
      >
      </button>}
      {location === '/saved-movies'
      &&
      <button
        className={`card__delete ${isShown && 'card__save_active'}`}
        type='button'
        onClick={handleDelete}
      />}
      </div>
          <p className='card__duration-text'>{`${Math.floor(data.duration / 60)}ч ${data.duration % 60}м`}</p>
    </li>
  )
}

export default MoviesCard;
