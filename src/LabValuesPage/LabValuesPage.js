/* REACT IMPORTS */
import React from 'react';
import { Link } from 'react-router-dom';
/* LOCAL IMPORTS */
import { apiCall } from '../_helpers';

class LabValuesPage extends React.Component {

    state = {
        labValueHistory: null,
    }

    componentDidMount() {
        apiCall(/medical_labs/, { method: 'GET' })
            .then(response => this.setState({labValueHistory: response}))
            .catch(_ => this.setState({labValueHistory: []}));
    }

    render() {
        return <Link props={this.state.labValueHistory} to="/program/lab-values">Lab Values</Link>
    }
}

export { LabValuesPage };
