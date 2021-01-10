import { combineReducers } from 'redux';
import aplications from './applicants/reducer';
import auth from './auth/reducer';
import internship from './internships/internship/reducer';
import internships from './internships/reducer';
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
	internships: combineReducers({
		list: internships,
		element: internship
	}),

	applicants: combineReducers({
		list: aplications
	})
})