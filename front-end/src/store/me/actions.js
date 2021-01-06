import { ME } from "../types";
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