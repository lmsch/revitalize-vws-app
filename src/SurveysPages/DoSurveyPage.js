/* LREACT IMPORTS */
import React from 'react';
/* THIRD PARTY IMPORTS */
import { withRouter } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
/* LOCAL IMPORTS */
import { GenerateSurvey, ErrorDisplay } from '../_components';
import { apiCall } from '../_helpers';

class DoSurveyPage extends React.Component {

    state = {
        model: null,
    }

    constructor() {
        super();
        this.errorsRef = React.createRef();
    }

    handleSubmitSurvey = () => {
        const model = JSON.stringify(this.state.model);
        const { surveyId  } = this.props.match.params;
        apiCall(`/surveys/${surveyId}/submit/`, { method: 'POST', body: model }, false)
            .then(_ => this.props.history.push('/program/surveys'))
            .catch(error => console.log(error));
    };

    componentDidMount() {
        const { surveyId  } = this.props.match.params;
        apiCall(`/surveys/${surveyId}/`, { method: 'GET'})
            .then(response => this.setState({model: response}));
    }


    render() {
        const { model } = this.state;
        if(!model) {
            return <div className="progress-spinner-container"><CircularProgress size={100} /></div>
        }
        return (
            <React.Fragment>
                <ErrorDisplay errorsRef={this.errorsRef} />
                <GenerateSurvey 
                    model={this.state.model} 
                    submit={this.handleSubmitSurvey} />
            </React.Fragment>
        );
    }
}

const routedDoSurveyPage = withRouter(DoSurveyPage);
export { routedDoSurveyPage as DoSurveyPage };
