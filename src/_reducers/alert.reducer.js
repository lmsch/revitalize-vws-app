/* LOCAL IMPORTS */
import { alertConstants } from '../_constants';

/**
 * Reduces an alertAction dispatch. States contains a type and a message.
 */
export function alert(state = {}, action) {
    switch (action.type) {
        case alertConstants.SUCCESS:
            return {
                type: 'alert-success',
                message: action.message,
            };
        case alertConstants.ERROR:
            return {
                type: 'alert-danger',
                message: action.message,
            };
        case alertConstants.CLEAR:
            return {};
        default:
            return state;
    }
}
