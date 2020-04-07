/**
 * REDUX USER ACTIONS: This is the set of actions related to authentication.
 * Authentication is a necessary REDUX state since it is required on virtually every
 * page that is private (i.e. need to be logged in to access). Includes actions for logging
 * in and out.
 */

/* LOCAL IMPORTS */
import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
};

/**
 * This is called to log a user in from their username and password. If successful, the app
 * is redirected to the user's profile after a provided callback is executed for cleaning up.
 * @param {*} username 
 * @param {*} password 
 * @param {*} callback - An optional function that is called before the redirect occurs or if login fails. Emits 'Success' or an error.
 */
function login(username, password, callback = null) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => { 
                    dispatch(success(user));
                    if (callback) {
                        callback('Success');
                    }
                    history.push('/program/profile');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                    if (callback) {
                        callback(error);
                    }
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

/**
 * An action for logging out. Deletes the authentication token from localstorage. If reload
 * is true, will reload the page when called, which will ultimately redirect to AboutUsPage. See
 * PrivateRoute in _components for more detail.
 * @param {*} reload - If true, reloads the page after token is deleted.
 */
function logout(reload = false) {
    return dispatch => {
        userService.logout();
        dispatch({ type: userConstants.LOGOUT });
        if(reload) {
            window.location.reload(true);
        }
    }
}
