import { AUTH, ME } from "../types";
import store from "../store";
import api from "../../api";
import { fetchMe } from "../me/actions";

export const logIn = async (data) => {
	return await api.post(`auth/login`, data).then(async (response) => {
		if (response && response.data) {
			localStorage.setItem("userToken", response.data)

			await loggedIn(response.data)

			return response.status;
		} else {
			return response
		}
	})
}

export const loggedIn = async (data) => {

	await store.dispatch({
		type: AUTH.LOGGED_IN,
		payload: data
	})

	return await fetchMe();
}

export const userLoggedOut = () => {
	localStorage.clear()
	store.dispatch({
		type: AUTH.LOGGED_OUT,
	})
	store.dispatch({
		type: ME.LOGGED_OUT
	})
}

export const loginExpired = () => {
	store.dispatch({
		type: AUTH.LOGIN_EXPIRED
	})
}

export const resetPassword = async (data) => {
	return await api.post(`auth/resetpassword`, data).then((response) => {
		return response.status;
	})
}

export const setNewPassword = async (data) => {
	return await api.post(`auth/setpassword`, data).then((response) => {
		return response.status;
	})
}

export const verifyToken = async (id) => {
	return await api.get(`auth/verifyresetable/${id}`).then((response) => {
		return response.status;
	})
}

export const registerUser = async (data) => {
	const response = await api.post(`auth/registration`, data);

	return response !== 409;
}