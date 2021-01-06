import { combineReducers } from 'redux';
import auth from './auth/reducer';
import me from './me/reducer';

import users from './users/reducer';
import user from './users/user/reducer';


export default combineReducers({
	auth,
	me,
	users: combineReducers({
		list: users,
		element: user
	}),
})