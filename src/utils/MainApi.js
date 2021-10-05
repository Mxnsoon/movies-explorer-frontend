import { MOVIES_URL } from './utils';

class MainApi {
  constructor(options) {
    this.baseUrl = options.baseUrl;
  }

handlePromise(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(new Error(`Ошибка: ${res.status}`));
}

register(name, email, password) {
  return fetch(`${this.baseUrl}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  })
    .then(res => this.handlePromise(res));
}

authorize(email, password) {
  return fetch(`${this.baseUrl}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then(res => this.handlePromise(res))
}

checkToken(jwt) {
  return fetch(`${this.baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`,
    },
  })
    .then(res => this.handlePromise(res));
}

getUserInfo() {
  return fetch(`${this.baseUrl}/users/me`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    },
  })
    .then(res => this.handlePromise(res));
}

setUserInfo(data) {
  return fetch(`${this.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
    }),
  })
    .then(res => this.handlePromise(res));
}

saveMovie(movie) {
  const {
    country,
    director,
    duration,
    year,
    description,
    nameRU,
    nameEN,
  } = movie;
  return fetch(`${this.baseUrl}/movies`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    },
    body: JSON.stringify({
      country,
      director,
      duration,
      year,
      description,
      image: `${MOVIES_URL}${movie.image.url}`,
      trailer: movie.trailerLink,
      thumbnail: `${MOVIES_URL}${movie.image.formats.thumbnail.url}`,
      nameRU,
      nameEN,
      movieId: movie.id,
    })
  })
    .then(res => this.handlePromise(res));
}

deleteMovie(id) {
  return fetch(`${this.baseUrl}/movies/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    },
  })
    .then(res => this.handlePromise(res));
}

getSavedMovies() {
  return fetch(`${this.baseUrl}/movies`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    },
  })
    .then(res => this.handlePromise(res));
}
}

export const mainApi = new MainApi({
  baseUrl: /*'http://localhost:3001'*/ 'https://api.mxnsoon.movies.nomoredomains.club',
});