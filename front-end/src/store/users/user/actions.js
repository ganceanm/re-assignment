import { USER } from "../../types";
import store from "../../store";
import api from "../../../api";


export const getUser = async (id) => {
    return await api.get(`user/${id}`).then((response) => {
        store.dispatch({
            type: USER.GET,
            payload: response.data
        })

        return response.status;
    })
}

export const putUser = async (data) => {
    return await api.put(`user/`, data).then((response) => {
        store.dispatch({
            type: USER.PUT,
        })

        return response.status === 202;
    })
}

export const deleteUser = async (id) => {
    return await api.delete(`user/${id}`).then((response) => {
        store.dispatch({
            type: USER.DELETE,
        })

        return response.status === 202;
    })
}