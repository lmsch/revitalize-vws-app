/* LREACT IMPORTS */
import React from 'react';
/* THIRD PARTY IMPORTS */
import { withRouter } from 'react-router-dom';
/* LOCAL IMPORTS */
import { AvailableSurveys } from '../_components';
import { apiCall } from '../_helpers';

class SurveysPage extends React.Component {

    state = {
        availableSurveys: [],
    }

    handleSurveySelected = (surveyId) => {
        const { path } = this.props.match;
        this.props.history.push(`${path}/${surveyId}`);
    }

    componentDidMount() {
        apiCall('/available_surveys/', { method: 'GET'})
            .then(response => this.setState({availableSurveys: response}));
    }
    
    render() {
        return (
            <AvailableSurveys 
                availableSurveys={this.state.availableSurveys}
                onSurveySelected={this.handleSurveySelected}/>
        );
    }
}

const routedSurveysPage = withRouter(SurveysPage);
export { routedSurveysPage as SurveysPage };
