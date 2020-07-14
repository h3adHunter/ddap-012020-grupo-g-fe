import { authHeader } from '../utils/helpers/auth-header'
import { handleResponse } from '../utils/helpers/response-handler'

let API_URL
if (process.env.NODE_ENV === "development") {
    API_URL = process.env.VUE_APP_API_URL
} else if (process.env.NODE_ENV === "production") {
    API_URL = "https://abastify-be.herokuapp.com"
}

export const orderService = {
	add,
	getMyOrders,
	getMyShopOrders,
}

function add(orderPayload) {
	const requestOptions = {
		method: 'POST',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify(orderPayload)
	};

	return fetch(`${API_URL}/orders/add`, requestOptions).then(handleResponse);
}

function getMyOrders(userId) {
	const requestOptions = {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	};

	return fetch(`${API_URL}/orders/user/${userId}`, requestOptions).then(handleResponse);
}

function getMyShopOrders(shopId) {
	const requestOptions = {
		method: 'GET'
	};

	return fetch(`${API_URL}/orders/shop/${shopId}`, requestOptions).then(handleResponse);
}