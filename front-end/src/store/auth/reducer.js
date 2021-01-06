import { AUTH } from '../types';

const initialState = {
    token: null,
    userRole: null,
    loginExpired: false,
}

export default function auth(state = initialState, action) {
    switch (action.type) {
        case AUTH.LOGGED_IN:
            return { ...state, token: action.payload, loginExpired: false };
        case AUTH.LOGGED_OUT:
            return { ...state, token: null, userRole: null }
        case AUTH.LOGIN_EXPIRED:
            return { ...state, token: null, userRole: null, loginExpired: true }
        default:
            return state;
    }
}