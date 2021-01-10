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
import Internships from '../pages/internships/Internships';
import { useSelector } from 'react-redux';
import CreateInternship from '../pages/internships/create/CreateInternship';
import EditInternship from '../pages/internships/edit/EditInternship';
import InternshipPage from '../pages/internships/element/InternshipPage';


const NavigationSwitch = (props) => {
	const userRole = useSelector(state => state.me.userRole);
	return (
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

			<ProtectedRoute path="/internships/create"
				toggle={props.drawerToggle}
				component={CreateInternship}
				requiredRole={clearence.One} />

			<ProtectedRoute path="/internships/edit/:id"
				toggle={props.drawerToggle}
				component={EditInternship}
				requiredRole={clearence.One} />

			<ProtectedRoute path="/internships/:id"
				toggle={props.drawerToggle}
				component={InternshipPage}
				requiredRole={clearence.One} />

			<ProtectedRoute path="/internships"
				toggle={props.drawerToggle}
				component={Internships}
				requiredRole={clearence.One} />


			<GuestRoute path="/setpassword/:id" component={SetPassword} />
			<GuestRoute path="/resetpassword" component={ResetPassword} />
			<GuestRoute path="/reg-rec" component={RegisterRecruiter} />
			<GuestRoute path="/reg-stud" component={RegisterStudent} />
			<GuestRoute path="/login" component={Login} />
			<GuestRoute path="/home" component={Home} />

			<Route path="/" component={AuthLoading} />
		</Switch>)
}

export default NavigationSwitch;