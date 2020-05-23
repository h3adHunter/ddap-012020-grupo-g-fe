import { handleResponse } from '../utils/helpers/response-handler'

const API_URL = process.env.API_URL || process.env.VUE_APP_API_URL

export const userService = {
  login,
  logout,
  register
}

function login(email, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  }

  return fetch(`${API_URL}/users/authenticate`, requestOptions)
    .then(handleResponse)
    .then( user => {
      // login successful if there's a jwt token in the response
      if (user.token) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user))
      }

      return user
    })
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user')
}

function register(user) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  }

  return fetch(`${API_URL}/users/register`, requestOptions).then(handleResponse)
}