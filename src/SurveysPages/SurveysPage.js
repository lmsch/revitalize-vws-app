/* LREACT IMPORTS */
import React from 'react';
/* THIRD PARTY IMPORTS */
import { withRouter } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
/* LOCAL IMPORTS */
import { AvailableSurveys, SurveyHistory } from '../_components';
import { apiCall } from '../_helpers';

class SurveysPage extends React.Component {

    state = {
        availableSurveys: null,
        surveyHistory: null,
    }

    handleSurveySelected = (surveyId) => {
        const { path } = this.props.match;
        this.props.history.push(`${path}/${surveyId}`);
    }

    componentDidMount() {
        apiCall('/available_surveys/', { method: 'GET'})
            .then(response => this.setState({availableSurveys: response}));
        // TODO: Remove reverse and allow sorting in history.
        apiCall('/survey_history/', { method: 'GET'})
            .then(response => this.setState({surveyHistory: response.reverse()}));
            
    }
    
    render() {
        const { availableSurveys, surveyHistory} = this.state;
        if(!availableSurveys || !surveyHistory ) {
            return <div className="progress-spinner-container"><CircularProgress size={100} /></div>
        }
        return (
            <React.Fragment>
                <AvailableSurveys 
                    availableSurveys={availableSurveys}
                    onSurveySelected={this.handleSurveySelected}/>
                <SurveyHistory surveyHistory={surveyHistory} />
            </React.Fragment>
        );
    }
}

const routedSurveysPage = withRouter(SurveysPage);
export { routedSurveysPage as SurveysPage };
