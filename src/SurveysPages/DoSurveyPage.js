/* LREACT IMPORTS */
import React from 'react';
/* THIRD PARTY IMPORTS */
import { withRouter } from 'react-router-dom';
import { Button, withStyles } from '@material-ui/core';
/* LOCAL IMPORTS */
import { GenerateSurvey } from '../_components';
import { apiCall } from '../_helpers';

const styles = () => ({
    submitSurveyContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '30px',
    },
    submitSurveyButton: {
        minWidth: '200px',
        width: '33%'
    }
});

class DoSurveyPage extends React.Component {

    state = {
        model: null,
    }

    handleSubmitSurvey = () => {
        const model = JSON.stringify(this.state.model);
        const { surveyId  } = this.props.match.params;
        apiCall(`/surveys/${surveyId}/submit/`, { method: 'POST', body: model }, false)
            .then(response => console.log(response))
            .catch(error => console.log(error));
    };

    componentDidMount() {
        const { surveyId  } = this.props.match.params;
        apiCall(`/surveys/${surveyId}/`, { method: 'GET'})
            .then(response => this.setState({model: response}));
    }


    render() {
        const { model } = this.state;
        const { classes } = this.props;
        if(!model) {
            return null;
        }
        return (
            <React.Fragment>
                <GenerateSurvey model={this.state.model} />
                <div className={classes.submitSurveyContainer}>
                    <Button 
                        className={classes.submitSurveyButton}
                        variant="contained" 
                        color="primary"
                        onClick={_ => this.handleSubmitSurvey()}>
                        Submit Survey
                    </Button>
                </div>
            </React.Fragment>
        );
    }
}

const routedDoSurveyPage = withRouter(DoSurveyPage);
const styledRoutedDoSurveyPage = withStyles(styles)(routedDoSurveyPage);
export { styledRoutedDoSurveyPage as DoSurveyPage };
