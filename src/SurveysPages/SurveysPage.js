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
        console.log(change);
        if(Number(change.selector) > 0 && change.min_date && change.max_date) {
            const range = JSON.stringify({min_date: change.min_date, max_date: change.max_date})
            apiCall(`/survey-values/${change.selector}/user/`, { method: 'POST', body: range })
                .then(response => console.log(response));
        }
    }

    componentDidMount() {
        apiCall('/surveys/user/available/', { method: 'GET'})
            .then(response => this.setState({availableSurveys: response}));
        apiCall('/surveys/user/', { method: 'GET'})
            .then(response => this.setState({surveyHistory: response}));
        apiCall('/indicators/survey/user/', { method: 'GET' })
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
                    header="Most recent survey:"
                    icon={false}
                    errors={[<span><b>{surveyHistory[0].name}</b> on <b>{moment.utc(surveyHistory[0].time).local().format('LLL')}</b></span>]} />
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
