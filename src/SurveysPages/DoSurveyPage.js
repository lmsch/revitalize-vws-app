/* LREACT IMPORTS */
import React from 'react';
/* THIRD PARTY IMPORTS */
import { withRouter } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import * as _ from 'lodash';
/* LOCAL IMPORTS */
import { GenerateSurvey, NotifyDisplay } from '../_components';
import { apiCall } from '../_helpers';

class DoSurveyPage extends React.Component {

    state = {
        model: null,
        spinner: true,
        errors: null,
    }

    constructor() {
        super();
        this.errorsRef = React.createRef();
    }

    handleSubmitSurvey = () => {
        this.setState({spinner: true});
        const model = JSON.stringify(this.state.model);
        const { surveyId  } = this.props.match.params;
        apiCall(`/surveys/${surveyId}/submit/`, { method: 'POST', body: model }, false)
            .then(_ => this.props.history.push('/program/surveys'))
            .catch(error => this.setState({errors: error.data.errors, spinner: false}, () => this.errorsRef.current.scrollIntoView()));
    };

    generateErrorMessages(errors) {
        const messages = [];
        _.forEach(errors, error => {
            messages.push(
                <span>
                    <b>Question {error.question_number ? error.question_number : '(unnumbered)'}:</b> {error.user_message}
                </span>
            );
        });
        return messages;
    }

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
                <NotifyDisplay 
                    header="Submission Error" 
                    errors={this.generateErrorMessages(this.state.errors)}
                    errorsRef={this.errorsRef} />
                <GenerateSurvey 
                    model={this.state.model} 
                    submit={this.handleSubmitSurvey} />
            </React.Fragment>
        );
    }
}

const routedDoSurveyPage = withRouter(DoSurveyPage);
export { routedDoSurveyPage as DoSurveyPage };
