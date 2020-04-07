/* REACT IMPORTS */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

/**
 * PRIVATE ROUTE: A wrapper for a REACT-ROUTER ROUTE. Checks if the user is logged in. 
 * If they are, continue to the requested page. Otherwise, redirect to AboutUsPage.
 */
export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('user')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    )} />
)
