import { INTERNSHIPS } from "../../types";
import store from "../../store";
import api from "../../../api";


export const getInternship = async (id) => {
	return await api.get(`internships/${id}`).then((response) => {
		store.dispatch({
			type: INTERNSHIPS.GET,
			payload: response.data
		})

		return response.status;
	})
}

export const postInternship = async (data) => {
	return await api.post(`internships/`, data).then((response) => {
		store.dispatch({
			type: INTERNSHIPS.POST,
		})

		return response.status === 202;
	})
}

export const putInternship = async (data) => {
	return await api.put(`internships`, data).then((response) => {
		store.dispatch({
			type: INTERNSHIPS.POST,
		})

		return response.status === 202;
	})
}

export const deleteInternship = async (id) => {
	return await api.delete(`internships/${id}`).then((response) => {
		store.dispatch({
			type: INTERNSHIPS.POST,
		})

		return response.status === 202;
	})
}

export const applyForInternship = async (id) => {
	return await api.post(`aplications/${id}`).then((response) => {
		store.dispatch({
			type: INTERNSHIPS.POST,
		})

		return response.status === 202;
	})
}

export const withdrawInternshipApplication = async (id) => {
	return await api.delete(`aplications/${id}`).then((response) => {
		store.dispatch({
			type: INTERNSHIPS.POST,
		})

		return response.status === 202;
	})
}
