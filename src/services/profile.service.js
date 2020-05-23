import { authHeader } from '../utils/helpers/auth-header'
import { handleResponse } from '../utils/helpers/response-handler'

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