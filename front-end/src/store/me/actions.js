import { ME, USER } from "../types";
import store from "../store";
import api from "../../api";

export const fetchMe = async () => {
	return await api.get(`user/me`).then((response) => {
		if (response && response.data) {
			store.dispatch({
				type: ME.FETCHED,
				payload: response.data
			})
		}
	}).catch((error) => {
		return error.response.status;
	})
}

export const updateProfile = async (data) => {
	return await api.put(`user/profile`, data).then((response) => {
		store.dispatch({
			type: USER.PUT,
		})

		return response.status === 202;
	})
}
