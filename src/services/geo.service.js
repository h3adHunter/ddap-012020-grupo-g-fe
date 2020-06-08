import { authHeader } from '../utils/helpers/auth-header'
import { handleResponse } from '../utils/helpers/response-handler'

const API_URL = process.env.API_URL || process.env.VUE_APP_API_URL

export const geoService = {
  getById,
  update
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${API_URL}/geo/${id}`, requestOptions).then(handleResponse);
}

function update(id, geo) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(geo)
    };

    return fetch(`${API_URL}/geo/${id}`, requestOptions).then(handleResponse);
}