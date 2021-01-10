import { INTERNSHIPS } from '../types';

export default function internships(state = {}, action) {
	switch (action.type) {
		case INTERNSHIPS.GET:
			return { ...action.payload };
		case INTERNSHIPS.CLEAR: {
			return {};
		}
		default:
			return state;
	}
}