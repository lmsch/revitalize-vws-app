/**
 * SURVEY PAGE: Contains various components related to a user's submitted surveys, such as:
 *  Most recent submitted survey
 *  Available surveys to complete
 *  Survey indicator progress graphs
 *  Survey history
 */

/* REACT IMPORTS */
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

    // Called when the user clicks "Do Survey" from AvailableSurveys. Adds the survey ID as a path variable and redirects.
    handleSurveySelected = (surveyId) => {
        const { path } = this.props.match;
        this.props.history.push(`${path}/${surveyId}`);
    }

    // If user has selected a new date range or survey indicator to graph, make an API call to retrieve the data to graph.
    handleGraphUpdate = (change) => {
        if(Number(change.selector) > 0 && change.min_date && change.max_date) {
            const range = JSON.stringify({min_date: change.min_date, max_date: change.max_date})
            apiCall(`/survey-values/${change.selector}/user/`, { method: 'POST', body: range })
                .then(response => this.setState({graphData: response}));
        }
    }

    // API calls to retrieve available surveys, survey history, and survey indicators.
    componentDidMount() {
        apiCall('/surveys/user/available/', { method: 'GET'})
            .then(response => this.setState({availableSurveys: response}));
        apiCall('/surveys/user/', { method: 'GET'})
            .then(response => this.setState({surveyHistory: response}));
        apiCall('/indicators/survey/user/', { method: 'GET' })
            .then(response => this.setState({userIndicators: response}));
    }
    
    render() {
        const { availableSurveys, surveyHistory, userIndicators, graphData } = this.state;
        // Show spinner if not loaded yet.
        if(!availableSurveys || !surveyHistory || !userIndicators) {
            return <div className="progress-spinner-container"><CircularProgress size={100} /></div>
        }
        return (
            <React.Fragment>
                {surveyHistory?.length > 0 ?
                <NotifyDisplay
                    header="Most recent survey:"
                    icon={false}
                    items={[<span><b>{surveyHistory[0].name}</b> on <b>{moment.utc(surveyHistory[0].time).local().format('LLL')}</b></span>]} />
                    : null
                }
                <AvailableSurveys 
                    availableSurveys={availableSurveys}
                    onSurveySelected={this.handleSurveySelected}/>
                <SurveyIndicatorLinear 
                    handleChange={this.handleGraphUpdate}
                    data={graphData}
                    options={userIndicators?.map(indicator => ({name: indicator.name, id: indicator.id}))} />
                <SurveyHistory 
                    surveyHistory={surveyHistory} />
            </React.Fragment>
        );
    }
}

const routedSurveysPage = withRouter(SurveysPage);
export { routedSurveysPage as SurveysPage };
