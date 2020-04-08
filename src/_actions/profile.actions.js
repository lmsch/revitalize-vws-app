/**
 * REDUX PROFILE ACTIONS: This set of actions is solely related to getting profile data from the API.
 * Since profile data is used through the app, it was decided that this should be included in the
 * REDUX state of the app.
 */

/* LOCAL IMPORTS */
import { profileConstants } from '../_constants';
import { alertActions } from './';
import { apiCall } from '../_helpers';

export const profileActions = {
    getProfile,
};

/**
 * Calls the endpoint ~/profile/user/, which returns a JSON of profile data
 * for the user (as determined by the user's access token).
 */
function getProfile() {
    return dispatch => {
        dispatch(request());
        apiCall('/profiles/user/', {method: 'GET'})
            .then(profile => dispatch(success(profile)))
            .catch(error => {
                dispatch(failure(error));
                dispatch(alertActions.error(error));
            });
    };

    function request() { return { type: profileConstants.PROFILE_REQUEST } }
    function success(profile) { return { type: profileConstants.PROFILE_SUCCESS, profile } }
    function failure(error) { return { type: profileConstants.PROFILE_FAILURE, error } }
}