import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ requiredRole: RequiredRole, component: Component, ...rest }) => {

    const role = useSelector(state => state.me.userRole);
    return (
        <Route
            {...rest}
            render={props => {
                if (RequiredRole.includes(role)) {
                    return <Component {...rest} />
                } else {
                    return <Redirect to="/" />
                }
            }}
        />
    )
}

ProtectedRoute.propTypes = {
    requiredRole: PropTypes.array.isRequired,
    component: PropTypes.func.isRequired,
}


export default ProtectedRoute;