/* LOCAL IMPORTS */
import { profileConstants } from '../_constants';
import { alertActions } from './';
import { apiCall } from '../_helpers';

export const profileActions = {
    getProfile,
};


function getProfile() {
    return dispatch => {
        dispatch(request());
        apiCall('/profile_retrieval/', {method: 'GET'})
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