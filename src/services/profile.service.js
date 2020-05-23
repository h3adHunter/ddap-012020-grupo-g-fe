import { authHeader } from '../utils/helpers/auth-header'
import userService from './user.service'

const API_URL = process.env.API_URL || process.env.VUE_APP_API_URL

export const profileService = {
  getById,
  update
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${API_URL}/profiles/${id}`, requestOptions).then(handleResponse);
}

function update(profile) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
    };

    return fetch(`${API_URL}/profiles/${profile.id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text)
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        userService.logout()
        location.reload(true)
      }

      const error = (data && data.message) || response.statusText
      return Promise.reject(error)
    }

    return data
  })
}
