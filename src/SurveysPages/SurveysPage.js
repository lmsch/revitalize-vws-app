/* LREACT IMPORTS */
import React from 'react';
/* THIRD PARTY IMPORTS */
import { withRouter } from 'react-router-dom';
import {  CircularProgress } from '@material-ui/core';
import * as moment from 'moment';
/* LOCAL IMPORTS */
import { AvailableSurveys, SurveyHistory, SurveyIndicatorLinear, NotifyDisplay } from '../_components';
import { apiCall } from '../_helpers';

class SurveysPage extends React.Component {

    state = {
        availableSurveys: null,
        surveyHistory: null,
        userIndicators: null,
        graphData: null,
    }

    handleSurveySelected = (surveyId) => {
        const { path } = this.props.match;
        this.props.history.push(`${path}/${surveyId}`);
    }

    handleGraphUpdate = (change) => {
        if(change.selector && change.min_date && change.max_date) {
            //const range = JSON.stringify({min_date: change.min_date, max_date: change.max_date})
            //apiCall(`/user_survey_indicators/${change.selector}/data/`, { method: 'GET', body: range })
                //.then(response => console.log(response));
        }
    }

    componentDidMount() {
        apiCall('/available_surveys/', { method: 'GET'})
            .then(response => this.setState({availableSurveys: response}));
        apiCall('/survey_history/', { method: 'GET'})
            .then(response => this.setState({surveyHistory: response}));
        apiCall('/user_survey_indicators/', { method: 'GET' })
            .then(response => this.setState({userIndicators: response}));
    }
    
    render() {
        const { availableSurveys, surveyHistory, userIndicators } = this.state;
        if(!availableSurveys || !surveyHistory || !userIndicators ) {
            return <div className="progress-spinner-container"><CircularProgress size={100} /></div>
        }
        return (
            <React.Fragment>
                {surveyHistory?.length > 0 ?
                <NotifyDisplay
                    header="Most recent submitted survey:"
                    icon={false}
                    errors={[`${surveyHistory[0].name} on ${moment.utc(surveyHistory[0].time).local().format('LLL')}`]} />
                    : null
                }
                <AvailableSurveys 
                    availableSurveys={availableSurveys}
                    onSurveySelected={this.handleSurveySelected}/>
                <SurveyIndicatorLinear 
                    handleChange={this.handleGraphUpdate}
                    options={userIndicators?.map(indicator => ({name: indicator.name, id: indicator.id}))} />
                <SurveyHistory 
                    surveyHistory={surveyHistory} />
            </React.Fragment>
        );
    }
}

const routedSurveysPage = withRouter(SurveysPage);
export { routedSurveysPage as SurveysPage };
