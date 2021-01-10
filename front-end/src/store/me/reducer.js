import { ME, USER } from '../types';

const initialState = {
	token: null,
}

export default function auth(state = initialState, action) {
	switch (action.type) {
		case ME.FETCHED:
			return { ...state, ...action.payload };
		case ME.LOGGED_OUT:
			return {};
		case USER.UPDATE_PROFILE:
			return { ...state, profile: { ...state.profile, [action.payload.field]: action.payload.value } };
		default:
			return state;
	}
}