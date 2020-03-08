/* LREACT IMPORTS */
import React from 'react';
/* THIRD PARTY IMPORTS */
import { withRouter } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
/* LOCAL IMPORTS */
import { GenerateSurvey } from '../_components';
import { apiCall } from '../_helpers';

class DoSurveyPage extends React.Component {

    state = {
        model: null,
        spinner: true,
        error: null,
    }

    handleSubmitSurvey = () => {
        this.setState({spinner: true});
        const model = JSON.stringify(this.state.model);
        const { surveyId  } = this.props.match.params;
        apiCall(`/surveys/${surveyId}/submit/`, { method: 'POST', body: model }, false)
            .then(_ => this.props.history.push('/program/surveys'))
            .catch(error => {
                console.log(error);
                this.setState({error, spinner: false});
            });
    };

    componentDidMount() {
        const { surveyId  } = this.props.match.params;
        apiCall(`/surveys/${surveyId}/`, { method: 'GET'})
            .then(response => this.setState({model: response, spinner: false}));
    }


    render() {
        if(this.state.spinner) {
            return <div className="progress-spinner-container"><CircularProgress size={100} /></div>
        }
        return (
            <React.Fragment>
                <GenerateSurvey 
                    model={this.state.model} 
                    submit={this.handleSubmitSurvey} />
            </React.Fragment>
        );
    }
}

const routedDoSurveyPage = withRouter(DoSurveyPage);
export { routedDoSurveyPage as DoSurveyPage };
