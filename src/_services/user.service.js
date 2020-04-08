/* LOCAL IMPORTS */
import { refreshData } from '../_helpers';

export const userService = {
    login,
    logout,
    refreshAccess,
};

/**
 * Service for login logic. Does a fetch to retrieve access and refresh token
 * from API using username and password. Used by userActions.
 * @param {*} username 
 * @param {*} password 
 */
function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };
    return fetch(`${process.env.REACT_APP_DEV_DOMAIN}/api/token/`, requestOptions)
        .then(response => handleResponse(response, true))
        .then(user => {
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        });
}

/**
 * Removes access and refresh token from localstorage.
 */
function logout() {
    localStorage.removeItem('user');
}

/**
 * Attempts to refresh the access token using the refresh token stored in localstorage.
 */
function refreshAccess() {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(refreshData()),
    };
    return fetch(`${process.env.REACT_APP_DEV_DOMAIN}/api/token/refresh/`, requestOptions)
        .then(handleResponse)
        .then(access => {
            let user = JSON.parse(localStorage.getItem('user'));
            user = {...user, ...access};
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        });
}

/**
 * Helper method to parse responses.
 * @param {*} response - Fetch response.
 * @param {*} loggingIn - If set, will not log user out if fetch response is an error.
 */
function handleResponse(response, loggingIn = false) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401 && !loggingIn) {
                logout();
                window.location.reload(true);
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}
