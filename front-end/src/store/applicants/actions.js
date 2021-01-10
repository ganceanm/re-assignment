import { APPLICANTS } from "../types";
import store from "../store";
import api from "../../api";

export const getApplicants = async (id, data) => {
	return await api.get(`aplications/${id}`, { params: data }).then((response) => {
		store.dispatch({
			type: APPLICANTS.GET,
			payload: response.data
		})

		return response.status;
	})
}

export const promoteApplication = async (id, data) => {
	return await api.put(`aplications/promote/${id}`).then((response) => {
		store.dispatch({
			type: APPLICANTS.POST,
			payload: response.data
		})

		return response.status === 202;
	})
}

export const rejectApplication = async (id, data) => {
	return await api.put(`aplications/reject/${id}`).then((response) => {
		store.dispatch({
			type: APPLICANTS.POST,
			payload: response.data
		})

		return response.status === 202;
	})
}