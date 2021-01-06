import { ME } from '../types';

const initialState = {
    token: null,
}

export default function auth(state = initialState, action) {
    switch (action.type) {
        case ME.FETCHED:
            return { ...state, ...action.payload };
        case ME.LOGGED_OUT:
            return {};
        default:
            return state;
    }
}