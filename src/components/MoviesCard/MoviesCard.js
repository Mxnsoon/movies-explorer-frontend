import { useLocation } from 'react-router';
import './MoviesCard.css';

function MoviesCard(props) {

    const { pathname } = useLocation();

    return (
        <div className="movies-card" id="movies-card">
            <img className="movies-card__image" src={props.src} alt={`Кадр из фильма ${props.name}`} />
            <div className="movies-card__info">
                <h3 className="movies-card__title">{props.name}</h3>
                <button className={`${props.isSaved && pathname === "/movies" ? "movies-card__button-like-active" : "movies-card__button-like-inactive"}
                ${pathname === "/saved-movies" ? "movies-card__button-delete" : ""}`}></button>
            </div>
                <p className="movies-card__duration">1ч 17м</p>
        </div>
    )
};

export default MoviesCard;

