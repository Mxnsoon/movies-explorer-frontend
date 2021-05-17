class MoviesApi {
  constructor(options) {
    this.baseUrl = options.baseUrl;
  }

handlePromise(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(new Error(`Ошибка: ${res.status}`));
}

getMovies() {
  return fetch(`${this.baseUrl}/beatfilm-movies`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(res => this.handlePromise(res));
}
}

export const moviesApi = new MoviesApi({
  baseUrl: 'https://api.nomoreparties.co',
});