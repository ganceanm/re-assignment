import { USERS } from "../types";
import store from "../store";
import api from "../../api";

export const getUsers = async (data) => {
	return await api.get(`user/`, { params: data }).then((response) => {
		store.dispatch({
			type: USERS.GET,
			payload: response.data
		})

		return response.status;
	})
}

export const clearUserList = () => {
	store.dispatch({
		type: USERS.CLEAR,
	})
}