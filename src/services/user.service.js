import { handleResponse } from '../utils/helpers/response-handler'

let API_URL
if (process.env.NODE_ENV === "development") {
    API_URL = process.env.VUE_APP_API_URL
} else if (process.env.NODE_ENV === "production") {
    API_URL = "https://abastify-be.herokuapp.com"
}

export const userService = {
  login,
  logout,
  register,
  check_availability
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

function check_availability(email){
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }

  return fetch(`${API_URL}/users/check_availability/${email}`, requestOptions)
    .then((response) => {
      return Promise.resolve(response)
    })
    .catch( (error) => {
      return Promise.reject(error)
    })
}