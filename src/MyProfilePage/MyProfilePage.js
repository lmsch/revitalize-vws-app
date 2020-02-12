/* REACT IMPORTS */
import React from 'react';
import { Link } from 'react-router-dom';

class MyProfilePage extends React.Component {
    
    render() {
        return <Link to="/program/profile">Profile</Link>
    }
}

export { MyProfilePage };
