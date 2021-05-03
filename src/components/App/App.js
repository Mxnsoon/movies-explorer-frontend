import React from 'react';
import { Route, Switch} from 'react-router';
import './App.css';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import HeaderMain from '../HeaderMain/HeaderMain';
import PopupMenu from '../PopupMenu/PopupMenu';

function App() {
  return (
    <div className="app">
      <div className="app__container">
        <Switch>
          <Route exact path="/">
            <HeaderMain />
            <Main />
            <Footer />
          </Route>
          <Route path="/movies">
            <Header />
            <Movies />
            <Footer />
          </Route>
          <Route path="/saved-movies">
            <Header />
            <SavedMovies />
            <Footer />
            </Route>
          <Route path="/profile">
            <Header />
            <Profile />
          </Route>
          <Route path="/signin">
            <Login />
          </Route>
          <Route path="/signup">
            <Register />
          </Route>
          <Route path="/*">
            <NotFound />
          </Route>
        </Switch>
        <PopupMenu />
      </div>
    </div>
  );
}

export default App;
