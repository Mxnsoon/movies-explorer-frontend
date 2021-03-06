import React from 'react';
import './App.css';
import { Redirect, Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { errors } from '../../utils/utils';
import { mainApi } from '../../utils/MainApi';
import { moviesApi } from '../../utils/MoviesApi';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import PopupMenu from '../PopupMenu/PopupMenu';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [status, setStatus] = React.useState(false);
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [infoMessage, setInfoMessage] = React.useState('');
  const [token, setToken] = React.useState('');
  const [moviesMessage, setMoviesMessage] = React.useState('');
  const [movies, setMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [initialMovies, setInitialMovies] = React.useState([]);
  const [initialSavedMovies, setInitialSavedMovies] = React.useState([]);
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  const location = useLocation().pathname;
  const history = useHistory();

  function handleRegister(name, email, password) {
    setIsLoading(true);
    mainApi.register(name, email, password)
      .then(() => {
        handleLogin(email, password)
        setInfoMessage('Регистрация прошла успешно')
      })
      .catch((err) => {
        setInfoMessage(errors(err));
        setStatus(false);
        setIsPopupOpen(true);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleLogin(email, password) {
    setIsLoading(true);
    mainApi.authorize(email, password)
      .then(data => {
        localStorage.setItem('jwt', data.token);
        setToken(data.token);
        setLoggedIn(true);
        setStatus(true);
        setInfoMessage('Вы вошли в аккаунт')
        history.push('/movies');
      })
      .catch((err) => {
        setInfoMessage(errors(err));
        setStatus(false);
      })
      .finally(() => {
        setIsLoading(false);
        setIsPopupOpen(true);
      })
  }

  function handleLogout() {
    localStorage.removeItem('jwt');
    history.push('/');
    setLoggedIn(false);
    localStorage.clear();
  }

  function getToken() {
    const jwt = localStorage.getItem('jwt')
    if (jwt) {
      setToken(jwt);
      mainApi.checkToken(jwt)
        .then(() => {
          setLoggedIn(true);
        })
        .catch(err => setInfoMessage(errors(err)))
    }
  }

  function handleUpdateUser(user) {
    mainApi.setUserInfo(user, token)
      .then((res) => {
        setCurrentUser(res);
        localStorage.setItem('name', res.name);
        localStorage.setItem('email', res.email);
        setStatus(true);
        setInfoMessage('Данные изменены')
      })
      .catch(err => setInfoMessage(errors(err)))
      .finally(() => {
        setIsPopupOpen(true);
      })
  }

  function getSavedMovies() {
    mainApi.getSavedMovies()
      .then((movies) => {
        setInitialSavedMovies(movies);
        movies.forEach((movie) => {
          const newSavedMovie = initialMovies.find(item => item.id === movie.movieId);
          if (newSavedMovie !== undefined) {
            newSavedMovie.saved = true;
            setInitialMovies(initialMovies.map(item => item.id === movie.movieId ? newSavedMovie : item));
          }
        })
      })
      .catch(() => {
        setInitialSavedMovies([]);
      })
  }

  function handleSearch(checked) {
    getSavedMovies();
    let sortedMovies;
    const word = localStorage.getItem('keyword') || '';
    const filteredMovies = location === '/movies' ? initialMovies : initialSavedMovies;

    if (word.length > 0) {
      sortedMovies = filteredMovies.filter(movie => JSON.stringify(movie).toLowerCase().includes(word.toLowerCase()));
      sortedMovies.length === 0 && setMoviesMessage('Ничего не найдено');
      if (checked) {
        location === '/movies'
        ? setMovies(sortedMovies.filter(movie => movie.duration <= 40))
        : setSavedMovies(sortedMovies.filter(movie => movie.duration <= 40))
      } else {
        location === '/movies'
        ? setMovies(sortedMovies)
        : setSavedMovies(sortedMovies)
      }
    } else {
      setMovies([]);
      setSavedMovies([]);
      setMoviesMessage('Введите ключевое слово');
    }
  }

  function handleSaveMovie(movie) {
    mainApi.saveMovie(movie)
      .then(() => {
        getSavedMovies();
        const newSavedMovie = initialMovies.find(item => item.id === movie.id);
        newSavedMovie.saved = true;
        setInitialMovies(initialMovies.map(item => item.id === newSavedMovie.id ? newSavedMovie : item));
        localStorage.setItem('movies', JSON.stringify(initialMovies));
      })
      .catch((err) => {
        setInfoMessage(errors(err));
        setMoviesMessage('Сохраненных фильмов не найдено')
      })
  }

  function handleDeleteMovie(movie) {
    const deletedMovie = initialSavedMovies.find((item) => item.movieId === movie.id);
    mainApi.deleteMovie(deletedMovie._id)
      .then(() => {
        getSavedMovies();
        const deletedFilm = initialMovies.find(item => item === movie);
        delete deletedFilm.saved;
        setInitialMovies(initialMovies.map(item => item.id === deletedFilm.id ? deletedFilm : item));
        localStorage.setItem('movies', JSON.stringify(initialMovies));
      })
      .catch(err => setInfoMessage(errors(err)))
  }

  function handleDeleteSavedMovie(movie) {
    mainApi.deleteMovie(movie._id)
      .then(() => {
        getSavedMovies();
        const newMovies = savedMovies.filter(item => item !== movie);
        const deletedMovie = initialMovies.find(item => item.id === movie.movieId);
        delete deletedMovie.saved;
        setSavedMovies(newMovies);
        setInitialMovies(initialMovies.map(item => item.id === deletedMovie.id ? deletedMovie : item));
        localStorage.setItem('movies', JSON.stringify(initialMovies));
      })
      .catch(err => setInfoMessage(errors(err)))
  }

  function closeAllPopups() {
    setIsPopupOpen(false);
  }

  function handleEscClick(evt) {
    if (evt.key === 'Escape') {
      closeAllPopups();
    }
  }

  function isolatePopup(evt) {
    evt.stopPropagation();
  }

  function updateWidth() {
    setWindowWidth(window.innerWidth);
  }

  React.useEffect(() => {
    getToken();
    if (loggedIn) {
      const promises = [mainApi.getUserInfo(), moviesApi.getMovies()]
      setIsLoading(true);
      Promise.all(promises)
        .then((res) => {
          const [userInfo, moviesList] = res;
          setCurrentUser(userInfo);
          localStorage.setItem('name', userInfo.name);
          localStorage.setItem('email', userInfo.email);
          if (localStorage.getItem('movies') === null) {
            localStorage.setItem('movies', JSON.stringify(moviesList));
            setInitialMovies(moviesList);
          } else {
            setInitialMovies(JSON.parse(localStorage.getItem('movies')));
          }
        })
        .catch((err) => {
          setInfoMessage(errors(err));
          setIsPopupOpen(true);
        })
        .finally(() => setIsLoading(false))
    }
  }, [loggedIn])

  React.useEffect(() => {
    window.addEventListener('resize', updateWidth);
    window.addEventListener('keydown', handleEscClick);
    return () => {
      window.removeEventListener('resize', updateWidth);
      window.removeEventListener('keydown', handleEscClick);
    }
  })

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Switch>
          <Route exact path='/'>
            <Main
              loggedIn={loggedIn}
              windowWidth={windowWidth}
            />
          </Route>
          <ProtectedRoute
            exact path='/movies'
            component={Movies}
            movies={movies}
            loggedIn={loggedIn}
            isLoading={isLoading}
            handleSearch={handleSearch}
            windowWidth={windowWidth}
            handleSaveMovie={handleSaveMovie}
            handleDeleteMovie={handleDeleteMovie}
            moviesMessage={moviesMessage}
          >
          </ProtectedRoute>
          <ProtectedRoute
            exact path='/saved-movies'
            component={SavedMovies}
            savedMovies={savedMovies}
            loggedIn={loggedIn}
            isLoading={isLoading}
            handleSearch={handleSearch}
            windowWidth={windowWidth}
            handleSaveMovie={handleSaveMovie}
            handleDeleteMovie={handleDeleteSavedMovie}
            moviesMessage={moviesMessage}
          >
          </ProtectedRoute>
          <ProtectedRoute
            exact path='/profile'
            component={Profile}
            loggedIn={loggedIn}
            onLogout={handleLogout}
            onUpdateUser={handleUpdateUser}
            windowWidth={windowWidth}
          >
          </ProtectedRoute>
          <Route exact path='/signup'>
            <Register
              onRegister={handleRegister}
              isLoading={isLoading}
            />
          </Route>
          <Route exact path='/signin'>
            <Login
              onLogin={handleLogin}
              isLoading={isLoading}
            />
          </Route>
          <Route exact path='/movies'>
            { loggedIn
              ? <Redirect to='/movies' />
              : <Redirect to='/' />
            }
          </Route>
          <Route exact path='/saved-movies'>
            { loggedIn
              ? <Redirect to='/saved-movies' />
              : <Redirect to='/' />
            }
          </Route>
          <Route exact path='/profile'>
            { loggedIn
              ? <Redirect to='/profile' />
              : <Redirect to='/' />
            }
          </Route>
          <Route path='/*'>
            <NotFound />
          </Route>
        </Switch>
        <PopupMenu
          isOpen={isPopupOpen}
          onClose={closeAllPopups}
          isolatePopup={isolatePopup}
          status={status}
          infoMessage={infoMessage}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
