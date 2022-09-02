export class Api {
    constructor(options) {
        this._baseURL = options.baseURL;
        this._headers = options.headers;
        this._baseAuthURL = options.baseAuthURL;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        else {
            return Promise.reject(`Что-то пошло не так: ${res.status}`);
        }
    }

    getInitialCards() {
        return fetch(`${this._baseURL}/cards`, {
            headers: this._headers
        }).then(this._checkResponse)
    }
    getUserInfo() {
        return fetch(`${this._baseURL}/users/me`, {
            headers: this._headers
        }).then(this._checkResponse)
    }
    setUserInfo() {
        return fetch(`${this._baseURL}/users/me`, {
            headers: this._headers
        })
            .then(this._checkResponse)
    }
    patchUserInfo(userName, userAbout) {
        return fetch(`${this._baseURL}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: userName,
                about: userAbout
            })
        }).then(this._checkResponse)
    }

    patchAvatarInfo(link) {
        return fetch(`${this._baseURL}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: link
            })
        }).then(this._checkResponse)
    }

    postNewCard(name, link) {
        return fetch(`${this._baseURL}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        }).then(this._checkResponse)
    }

    deleteCard(id) {
        return fetch(`${this._baseURL}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers
        })
    }


    like(id) {
        return fetch(`${this._baseURL}/cards/${id}/likes`, {
            method: 'PUT',
            headers: this._headers
        }).then(this._checkResponse)
    }

    unlike(id) {
        return fetch(`${this._baseURL}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: this._headers
        }).then(this._checkResponse)
    }

    signup(password, email) {
        return fetch(`${this._baseAuthURL}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                "password": `${password}`,
                "email": `${email}`
            })
        }).then(this._checkResponse)
    }
    signin(password, email) {
        return fetch(`${this._baseAuthURL}/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                "password": `${password}`,
                "email": `${email}`
            })
        }).then(this._checkResponse)
    }

    checkToken() {
        return fetch(`${this._baseAuthURL}/users/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization" : `Bearer ${localStorage.getItem('jwt')}`
              }
        }).then(this._checkResponse)
    }

}
export const api = new Api({
    baseURL: 'https://mesto.nomoreparties.co/v1/cohort36',
    headers: {
      authorization: 'a4b67e43-7921-4ffc-97a3-90eb387a74ab',
      'Content-Type': 'application/json'
    },
    baseAuthURL: 'https://auth.nomoreparties.co'
  });