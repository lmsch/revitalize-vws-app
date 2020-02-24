/* LOCAL IMPORTS */
import { userService } from '../_services';
import { alertActions, userActions } from '../_actions';
import { store } from '.';

export const DEFAULT_TIMEOUT = 2;

export async function apiCall(url, options, timeout = DEFAULT_TIMEOUT) {
    try {
        const appendedUrl = `${process.env.REACT_APP_DEV_DOMAIN}/api${url}`;
        if (options.headers && !options.headers['Content-Type']) {
            options.headers['Content-Type'] = 'application/json';
        }
        options.headers = {...options.headers, ...accessHeader()};
        const response = await fetch(appendedUrl, options);
        return await handleResponse(response);
    } catch(error) {
        if(!timeout) {
            store.dispatch(userActions.logout());
            return Promise.reject(error);
        }
        if(error.status === 401) {
            try {
                await apiRefresh();
            } catch(error) {
                store.dispatch(alertActions.error(error));
            }
            return await apiCall(url, options, timeout - 1);
        }

    }

}

async function apiRefresh() {
    dispatch(request());
    try {
        const response = await userService.refreshAccess();
        const user = await handleResponse(response);
        store.dispatch(success(user));
        return user;
    } catch(error) {
        store.dispatch(failure(error));
        return Promise.reject(error);
    }
    function request() { return { type: userConstants.REFRESH_REQUEST } }
    function success(user) { return { type: userConstants.REFRESH_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REFRESH_FAILURE, error } }
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            return Promise.reject(response);
        }
        return data;
    });
}

export function accessHeader() {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user && user.access) {
        return { 'Authorization': 'Bearer ' + user.access };
    } else {
        return {};
    }
}

export function refreshData() {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user && user.refresh) {
        return { 'refresh': user.refresh };
    } else {
        return {};
    }
}
