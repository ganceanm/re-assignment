import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ProtectedRoute from '../components/navigation/ProtectedRoute';
import GuestRoute from '../components/navigation/GuestRoute';
import clearence from '../constants/clearence';

import AuthLoading from '../pages/auth/auth';
import Login from '../pages/auth/Login/Login';
import ResetPassword from '../pages/auth/ResetPassword/ResetPassword';
import SetPassword from '../pages/auth/SetPassword/SetPassword';
import RegisterStudent from '../pages/auth/Registration/RegisterStudent';
import RegisterRecruiter from '../pages/auth/Registration/RegisterRecruiter';

import Home from '../pages/home/Home';

import Dashboard from '../pages/dashboard/Dashboard';

import Users from '../pages/users/Users';
import UserDetails from '../pages/users/user/User';


const NavigationSwitch = (props) => (
	<Switch>
		<ProtectedRoute path="/dashboard"
			toggle={props.drawerToggle}
			component={Dashboard}
			requiredRole={clearence.Zero} />

		<ProtectedRoute path="/users/:id"
			toggle={props.drawerToggle}
			component={UserDetails}
			requiredRole={clearence.Two} />
		<ProtectedRoute path="/users"
			toggle={props.drawerToggle}
			component={Users}
			requiredRole={clearence.Two} />


		<GuestRoute path="/setpassword/:id" component={SetPassword} />
		<GuestRoute path="/resetpassword" component={ResetPassword} />
		<GuestRoute path="/reg-rec" component={RegisterRecruiter} />
		<GuestRoute path="/reg-stud" component={RegisterStudent} />
		<GuestRoute path="/login" component={Login} />
		<GuestRoute path="/home" component={Home} />

		<Route path="/" component={AuthLoading} />
	</Switch>
)

export default NavigationSwitch;