import { USER } from '../../types';


export default function user(state = {}, action) {
    switch (action.type) {
        case USER.GET:
            return { ...state, ...action.payload };
        case USER.PUT:
            return {};
        case USER.DELETE:
            return {};
        default:
            return state;
    }
}