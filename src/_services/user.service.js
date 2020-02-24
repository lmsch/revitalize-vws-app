/* LOCAL IMPORTS */
import { refreshData } from '../_helpers';

export const userService = {
    login,
    logout,
    refreshAccess,
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };
    return fetch(`${process.env.REACT_APP_DEV_DOMAIN}/api/token/`, requestOptions)
        .then(handleResponse)
        .then(user => {
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        });
}

function logout() {
    localStorage.removeItem('user');
}

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
            user = {...user, access};
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        });
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                logout();
                window.location.reload(true);
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}
