export const MOVIES_URL = 'https://api.nomoreparties.co';

export function errors(err) {
  if (err.status === 400) {
    return `Не верно заполнено одно из полей.`;
  } else if (err.status === 401) {
    return `Вы ввели неправильный логин или пароль.`;
  } else if (err.status === 403) {
    return `Токен не передан или передан не в том формате.`;
  } else if (err.status === 404) {
    return `Данные не найдены.`;
  } else if (err.status === 409) {
    return `Пользователь с таким email уже существует.`;
  } else if (err.status === 429) {
    return `Слишком много запросов. Попробуйте позже.`;
  } else if (err.status === 500) {
    return `На сервере произошла ошибка.`;
  } else {
    return `Ошибка сервера.`;
  }
}