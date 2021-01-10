import { INTERNSHIPS } from "../types";
import store from "../store";
import api from "../../api";

export const getInternships = async (data) => {
	return await api.get(`internships/`, { params: data }).then((response) => {
		store.dispatch({
			type: INTERNSHIPS.GET,
			payload: response.data
		})

		return response.status;
	})
}

export const clearInternshipList = () => {
	store.dispatch({
		type: INTERNSHIPS.CLEAR,
	})
}