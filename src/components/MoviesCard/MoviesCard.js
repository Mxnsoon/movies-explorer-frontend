import './MoviesCard.css';

function MoviesCard(props) {
    return (
        <div className="movies-card">
            <img className="movies-card__image" src={props.src} alt={`Кадр из фильма ${props.name}`} />
            <div className="movies-card__info">
                <h3 className="movies-card__title">{props.name}</h3>
                <button className="movies-card__button-like"></button>
            </div>
                <p className="movies-card__duration">1ч 17м</p>
        </div>
    )
};

export default MoviesCard;

