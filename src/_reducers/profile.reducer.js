// ---profileReducer.js
// uses the state to process an output and set the next value for the payload and loadingProfile.

/* LOCAL IMPORTS */
import { profileConstants } from '../_constants';

export function profile(state = {}, action) {
    switch (action.type) {
        case profileConstants.PROFILE_REQUEST:
            return {
                loadingProfile: true,
            };
        case profileConstants.PROFILE_SUCCESS:
            return {
                profileLoaded: true,
                payload: action.profile,
            };
        case profileConstants.PROFILE_FAILURE:
            return {};
        default:
            return state;
    }
}
