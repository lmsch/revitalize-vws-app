/* LREACT IMPORTS */
import React from 'react';
/* THIRD PARTY IMPORTS */
import { Router, withRouter } from 'react-router-dom';
/* LOCAL IMPORTS */
import { history } from '../_helpers';
import { PrivateRoute } from '../_components';

class SurveysPage extends React.Component {
    
    render() {
        const { path } = this.props.match;
        return (
            <Router history={history}>
                <PrivateRoute path={`${path}/:surveyId`} component={<div>Hello</div>} />
            </Router>
        );
    }
}

const routedSurveysPage = withRouter(SurveysPage);
export { routedSurveysPage as SurveysPage };
