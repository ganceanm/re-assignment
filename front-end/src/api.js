import axios from 'axios';
import store from './store/store'
import { loginExpired } from './store/auth/actions';

const location = "http://localhost:8080/assignment/api/";

axios.defaults.baseURL = location;
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use(request => {
	const token = store.getState().auth.token;

	request.headers.common['Authorization'] = "Bearer " + token;

	return request;
}, error => {
	return Promise.reject(error);
});

axios.interceptors.response.use(response => {

	return response;
}, error => {

	if (error.response.status === 401) {
		localStorage.clear();
		loginExpired();
	}

	return error.response.status;
});


export default axios;
