class Api {
  constructor({baseUrl}) {
    this._baseUrl = baseUrl;
  }

  _checkResult(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  getInitialCards() {
    const token = localStorage.getItem('token');
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: {
        "authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      return this._checkResult(res);
    });
  }

  addCard({ name, link }) {
    const token = localStorage.getItem('token');
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        "authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => this._checkResult(res));
  }

  deleteCard(cardId) {
    const token = localStorage.getItem('token');
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        "authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => this._checkResult(res));
  }

  addLike(cardId) {
    const token = localStorage.getItem('token');
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        "authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => this._checkResult(res));
  }

  deleteLike(cardId) {
    const token = localStorage.getItem('token');
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        "authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => this._checkResult(res));
  }

  getUserInfo() {
    const token = localStorage.getItem('token');
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => this._checkResult(res));
  }

  editUserInfo({ name, about }) {
    const token = localStorage.getItem('token');
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        "authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => this._checkResult(res));
  }

  editUserAvatar({ avatar }) {
    const token = localStorage.getItem('token');
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        "authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then((res) => this._checkResult(res));
  }
}

export const api = new Api({
  baseUrl: "https://api.rda-mesto.nomoreparties.co",
  // baseUrl: "http://localhost:4000",
  // headers: {
  //   // "Authorization": `Bearer ${localStorage.getItem('token')}`,
  //   "Content-Type": "application/json",
  // },
});
