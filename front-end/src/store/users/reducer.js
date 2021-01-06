import { USERS } from '../types';

export default function users(state = {}, action) {
    switch (action.type) {
        case USERS.GET:
            return { ...action.payload };
        case USERS.CLEAR: {
            return {};
        }
        default:
            return state;
    }
}