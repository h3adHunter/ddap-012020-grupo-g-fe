import { authHeader } from '../utils/helpers/auth-header'
import { handleResponse } from '../utils/helpers/response-handler'

let API_URL
if (process.env.NODE_ENV === "development") {
    API_URL = process.env.VUE_APP_API_URL
} else if (process.env.NODE_ENV === "production") {
    API_URL = process.env.API_URL
}

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

function update(id, profile) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
    };

    return fetch(`${API_URL}/profiles/${id}`, requestOptions).then(handleResponse);
}