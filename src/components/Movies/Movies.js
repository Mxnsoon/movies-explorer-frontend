/* import Preloader from '../Preloader/Preloader'; */
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import "./Movies.css";
import Searchform from '../SearchForm/SearchForm';

function Movies() {
    return (
        <>
        <Searchform />
        {/* <Preloader /> */}
        <MoviesCardList />
        <button className="movies__load-more" type="button">Ещё</button>
        </>
    )
}

export default Movies;