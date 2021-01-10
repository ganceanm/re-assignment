import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const GuestRoute = ({ component: Component, ...rest }) => {
	const isAuthenticated = useSelector(state => state.me.userRole)
	return (
		<Route {...rest}>
			{!!isAuthenticated ? <Redirect to={"/users/me"} /> : <Component />}
		</Route>
	)
}

GuestRoute.propTypes = {
	component: PropTypes.func.isRequired,
}

export default (GuestRoute);