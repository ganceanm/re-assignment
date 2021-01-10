import { APPLICANTS } from '../types';

export default function aplications(state = {}, action) {
	switch (action.type) {
		case APPLICANTS.GET:
			return { ...action.payload };
		case APPLICANTS.CLEAR: {
			return {};
		}
		default:
			return state;
	}
}