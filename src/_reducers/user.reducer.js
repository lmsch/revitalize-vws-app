import {apiCall} from '../_helpers/auth';

export default function user() {
    return(
        apiCall('/profiles/', { method: 'GET'}).then(response => console.log(response))
    )
};