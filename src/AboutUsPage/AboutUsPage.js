/* REACT IMPORTS */
import React from 'react';
import { Link } from 'react-router-dom';

class AboutUsPage extends React.Component {

    render() {
        return (
            <React.Fragment>
                <Link to="/login">Login</Link>
                <Link to="/program/surveys">Surveys</Link>
            </React.Fragment>
        ) ;
    }
}

export { AboutUsPage };
