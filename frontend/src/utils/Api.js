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
    const jwt = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: {
        "authorization": `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      return this._checkResult(res);
    });
  }

  addCard({ name, link }) {
    const jwt = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        "authorization": `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => this._checkResult(res));
  }

  deleteCard(cardId) {
    const jwt = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        "authorization": `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    }).then((res) => this._checkResult(res));
  }

  addLike(cardId) {
    const jwt = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        "authorization": `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    }).then((res) => this._checkResult(res));
  }

  deleteLike(cardId) {
    const jwt = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        "authorization": `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    }).then((res) => this._checkResult(res));
  }

  getUserInfo() {
    const jwt = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "authorization": `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    }).then((res) => this._checkResult(res));
  }

  editUserInfo({ name, about }) {
    const jwt = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        "authorization": `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => this._checkResult(res));
  }

  editUserAvatar({ avatar }) {
    const jwt = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        "authorization": `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then((res) => this._checkResult(res));
  }
}

export const api = new Api({
  baseUrl: "http://localhost:4000",
  // headers: {
  //   // "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
  //   "Content-Type": "application/json",
  // },
});
