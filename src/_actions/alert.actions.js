/**
 * REDUX ALERT ACTIONS: Used to propagate messages of any type throughout the app.
 * Any REDUX action performed should perform this action as well. Actions can result in
 * success or failure, each with an associated message. The state of
 * alertActions can be cleared as well, though this is done automatically in App.js.
 */

/* LOCAL IMPORTS  */
import { alertConstants } from '../_constants';

export const alertActions = {
    success,
    error,
    clear
};

function success(message) {
    return { type: alertConstants.SUCCESS, message };
}

function error(message) {
    return { type: alertConstants.ERROR, message };
}

function clear() {
    return { type: alertConstants.CLEAR };
}
