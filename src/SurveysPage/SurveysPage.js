/* LREACT IMPORTS */
import React from 'react';
/* THIRD PARTY IMPORTS */
import { Router, Switch, Route, withRouter } from 'react-router-dom';
/* LOCAL IMPORTS */
import { history } from '../_helpers';

class SurveysPage extends React.Component {
    
    render() {
        const { path } = this.props.match;
        <Router history={history}>
            <PrivateRoute path={`${path}/:surveyId`} component={} />
        </Router>
        return <Link to="/program/surveys">Surveys</Link>
    }
}

const routedSurveysPage = withRouter(SurveysPage);
export { routedSurveysPage as SurveysPage };
