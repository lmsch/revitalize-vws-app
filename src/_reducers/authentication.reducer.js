// ---authenticationReducer.js
// takes the state and uses a switch statement to process the next output and next state value.


/* LOCAL IMPORTS */
import { userConstants } from '../_constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state = initialState, action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loggingIn: true,
                user: action.user,
            };
        case userConstants.REFRESH_REQUEST:
            return {
                loggingIn: true,
                user: state.user,
            }
        case userConstants.LOGIN_SUCCESS:
        case userConstants.REFRESH_SUCCESS:
            return {
                loggedIn: true,
                user: action.user,
            };
        case userConstants.LOGIN_FAILURE:
        case userConstants.REFRESH_FAILURE:
        case userConstants.LOGOUT:
            return {
                loggedIn: false,
                error: action.error,
            };
        default:
            return state;
    }
}