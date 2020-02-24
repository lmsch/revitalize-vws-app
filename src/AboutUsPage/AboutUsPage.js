/* REACT IMPORTS */
import React from 'react';
import { Link } from 'react-router-dom';

import { apiCall  } from '../_helpers';

class AboutUsPage extends React.Component {

    // An example on how to use. Do not include REACT_APP_DEV_DOMAIN/api
    componentDidMount() {
        apiCall('/', { method: 'GET' })
            .then(response => console.log(response))
    }
    
    render() {
        return <Link to="/">About Us</Link>
    }
}

export { AboutUsPage };
