import MoviesCard from '../MoviesCard/MoviesCard';

import movie1 from '../../images/movie-card-image-1.png';
import movie2 from '../../images/movie-card-image-2.png';
import movie3 from '../../images/movie-card-image-3.png';
import movie4 from '../../images/movie-card-image-4.png';

import './MoviesCardList.css';

function MoviesCardList() {
    return (
      <ul className="movies-cards">
        <li className="movies-cards__card">
          <MoviesCard
            isSaved={true}
            src={movie1}
            name="33 слова о дизайне"
            />
        </li>
        <li className="movies-cards__card">
          <MoviesCard
            isSaved={false}
            src={movie2}
            name="Киноальманах «100 лет дизайна»"
            />
        </li>
        <li className="movies-cards__card">
          <MoviesCard
            isSaved={true}
            src={movie3}
            name="В погоне за Бенкси"
            />
        </li>
        <li className="movies-cards__card">
          <MoviesCard
          isSaved={false}
          src={movie4}
          name="Баския: Взрыв реальности"
          />
        </li>
      </ul>
    )
};

export default MoviesCardList;