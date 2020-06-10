import { authHeader } from '../utils/helpers/auth-header'
import { handleResponse } from '../utils/helpers/response-handler'

const API_URL = process.env.API_URL || process.env.VUE_APP_API_URL

export const shopService = {
	getAll,
	getByProfileId,
	add,
	update
}

function getAll() {
	const requestOptions = {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	};

	return fetch(`${API_URL}/shops/`, requestOptions).then(handleResponse);
}

function getByProfileId(id) {
	const requestOptions = {
		method: 'GET',
		headers: authHeader()
	};

	return fetch(`${API_URL}/shops/profile/${id}`, requestOptions).then(handleResponse);
}

function add(shopPayload) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify(shopPayload)
	};

	return fetch(`${API_URL}/shops/add`, requestOptions).then(handleResponse);
}

function update(shop_id, shop) {
	const requestOptions = {
		method: 'PUT',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify(shop)
	};

	return fetch(`${API_URL}/shops/profile/${shop_id}`, requestOptions).then(handleResponse);
}