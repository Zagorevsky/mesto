

export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _handlerError = (res) => {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // запрос карточек из базы данных
  getInitialCards() {
    return fetch(this._baseUrl + '/cards', {
      method: 'GET',
      headers: this._headers
    })
      .then(this._handlerError);
  }

  // запрос данных профиля с сервера
  getInitialProfile() {
    return fetch(this._baseUrl + '/users/me', {
      method: 'GET',
      headers: this._headers
    })
      .then(this._handlerError);
  }

  // запись новой карточки на сервер
  addCardToServer(data) {
    return fetch(this._baseUrl + '/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(this._handlerError);
  }

  // запись данных профиля на серве
  addProfileToServer(data) {
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(this._handlerError);
  }

  // запись данных  автара на серве
  addAvatarToServer(data) {
    return fetch(this._baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(this._handlerError);
  }

  // добавить лайк на сервер
  addLikesToServer(id) {
    return fetch(this._baseUrl + '/cards/likes/' + `${id}`, {
      method: 'PUT',
      headers: this._headers,
    })
      .then(this._handlerError);
  }

  // удалить лайк с сервера
  deleteLikesToServer(id) {
    return fetch(this._baseUrl + '/cards/likes/' + `${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(this._handlerError);
  }

  // удалить карту с сервера
  deleteCardToServer(id) {
    return fetch(this._baseUrl + '/cards/' + `${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(this._handlerError);
  }

}
