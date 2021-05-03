/* import Preloader from '../Preloader/Preloader'; */
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

import './SavedMovies.css';

function SavedMovies() {
  return (
    <>
    <SearchForm />
    {/* <Preloader /> */}
    <MoviesCardList />
    </>
  )
  };

export default SavedMovies;