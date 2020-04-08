/* LOCAL IMPORTS */
import { userService } from '../_services';
import { alertActions, userActions } from '../_actions';
import { userConstants } from '../_constants';
import { store } from '.';

export const DEFAULT_TIMEOUT = 3;

/**
 * Helper method to do an API Call. Will make HTTP request. If access token has expired,
 * will automatically try to renew it. Will timeout after DEFAULT_TIMEOUT failures.
 * Returns either the parsed data or error in form {response: Response, data: any}
 * @param {*} url - The url of the endpoint. Example: '/profile/user/'
 * @param {*} options - Normal fetch options. Defaults to 'application-json' in headers.
 * @param {*} logout - Log the user out if the apiCall fails after timeout. Defaults to true.
 * @param {*} timeout - How many times to try the fetch. Defaults to DEFAULT_TIMEOUT.
 */
export async function apiCall(url, options, logout = true, timeout = DEFAULT_TIMEOUT) {
    try {
        if(!options.headers) {
            options.headers = {};
        }
        if (!options.headers['Content-Type']) {
            options.headers['Content-Type'] = 'application/json';
        }
        const appendedUrl = `${process.env.REACT_APP_DEV_DOMAIN}/api${url}`;
        options.headers = {...options.headers, ...accessHeader()};
        const response = await fetch(appendedUrl, options);
        return await handleResponse(response);
    } catch(error) {
        if(!timeout) {
            if (logout) {
                store.dispatch(userActions.logout(true));
                return error;
            }
            return Promise.reject(error);
        }
        if(error.data?.code === 'token_not_valid') {
            try {
                await apiRefresh();
            } catch(error) {
                store.dispatch(alertActions.error(error));
            }
        }
        return await apiCall(url, options, logout, timeout - 1);
    }
}

/**
 * Helper to dispatch an apiRefresh REDUX action. Trys to refresh API access token.
 */
async function apiRefresh() {
    store.dispatch(request());
    try {
        const user = await userService.refreshAccess();
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

/**
 * Helper method to parse response from fetch.
 * @param {*} response - Response from fetch.
 */
function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            return Promise.reject({response, data});
        }
        return data;
    });
}

/**
 * Helper method to add access header to a fetch for the API.
 */
export function accessHeader() {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user && user.access) {
        return { 'Authorization': 'Bearer ' + user.access };
    } else {
        return {};
    }
}

/**
 * Helper method to add a refresh header to an API refresh request.
 */
export function refreshData() {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user && user.refresh) {
        return { 'refresh': user.refresh };
    } else {
        return {};
    }
}
