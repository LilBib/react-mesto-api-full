export class Api {
    constructor(options) {
        this._baseURL = options.baseURL;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        else {
            return Promise.reject(`Что-то пошло не так: ${res.status}`);
        }
    }

    getInitialCards(token) {
        return fetch(`${this._baseURL}/cards`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token}`
              }
        }).then(this._checkResponse)
    }
    getUserInfo(token) {
        return fetch(`${this._baseURL}/users/me`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token}`
              }
        }).then(this._checkResponse)
    }
    patchUserInfo(userName, userAbout, token) {
        return fetch(`${this._baseURL}/users/me`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token}`
              },
            body: JSON.stringify({
                name: userName,
                about: userAbout
            })
        }).then(this._checkResponse)
    }

    patchAvatarInfo(link, token) {
        return fetch(`${this._baseURL}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token}`
              },
            body: JSON.stringify({
                avatar: link
            })
        }).then(this._checkResponse)
    }

    postNewCard(name, link, token) {
        return fetch(`${this._baseURL}/cards`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token}`
              },
            body: JSON.stringify({
                name: name,
                link: link
            })
        }).then(this._checkResponse)
    }

    deleteCard(id, token) {
        return fetch(`${this._baseURL}/cards/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token}`
              }
        })
    }


    like(id, token) {
        return fetch(`${this._baseURL}/cards/${id}/likes`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token}`
              }
        }).then(this._checkResponse)
    }

    unlike(id, token) {
        return fetch(`${this._baseURL}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token}`
              }
        }).then(this._checkResponse)
    }

    signup(password, email) {
        return fetch(`${this._baseURL}/signup`, {
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
        return fetch(`${this._baseURL}/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({
                "password": `${password}`,
                "email": `${email}`
            })
        }).then(this._checkResponse)
    }

    checkToken(token) {
        return fetch(`${this._baseURL}/users/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token}`
              }
        }).then(this._checkResponse)
    }

}
export const api = new Api( {
    baseURL: 'https://api.vladimirmisakyan.mesto.project.nomoredomains.sbs',
  });