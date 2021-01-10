import { INTERNSHIPS } from '../../types';


export default function internship(state = {}, action) {
	switch (action.type) {
		case INTERNSHIPS.GET:
			return action.payload;
		case INTERNSHIPS.PUT:
			return {};
		case INTERNSHIPS.DELETE:
			return {};
		default:
			return state;
	}
}