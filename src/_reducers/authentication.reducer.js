/* LOCAL IMPORTS */
import { userConstants } from '../_constants';

// If user is already logged in (auth token is still stored in localstorage), set initial state to logged in.
let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

/**
 * Reduces a userAction dispatch. State can contain:
 *  loggingIn: boolean
 *  user: {access_token: string, refresh_token: string}
 *  loggedIn: boolean,
 *  error: string | Error
 */
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