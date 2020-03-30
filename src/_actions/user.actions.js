/* LOCAL IMPORTS */
import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
};

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

function logout(reload = false) {
    return dispatch => {
        userService.logout();
        dispatch({ type: userConstants.LOGOUT });
        if(reload) {
            window.location.reload(true);
        }
    }
}
