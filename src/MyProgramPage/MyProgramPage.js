// ---MyProgramPage.js
// contains the routing of the vairous pages that are only accessible when the user is logged in, "privateRoute".

/* REACT IMPORTS */
import React from 'react';
import { Router, Switch, withRouter } from 'react-router-dom';
/* LOCAL IMPORTS */
import { PrivateRoute } from '../_components';
import { SurveysPage } from '../SurveysPages';
import { DietaryJournalPage} from "../DietaryJournalPage";
import { GoalProgressPage } from "../GoalProgressPage";
import { LabValuesPage } from "../LabValuesPage";
import { MyProfilePage } from "../MyProfilePage";
import { DoSurveyPage } from '../SurveysPages';
import { history } from '../_helpers/history';

class MyProgramPage extends React.Component {
    
    render() {
        const { path } = this.props.match;
        return (
            <Router history={history}>
                <Switch>
                    <PrivateRoute path={`${path}/surveys/:surveyId`} component={DoSurveyPage} />
                    <PrivateRoute path={`${path}/surveys`} component={SurveysPage} />
                    <PrivateRoute path={`${path}/journal`} component={DietaryJournalPage} />
                    <PrivateRoute path={`${path}/progress`} component={GoalProgressPage} />
                    <PrivateRoute path={`${path}/lab-values`} component={LabValuesPage} />
                    <PrivateRoute path={`${path}/profile`} component={MyProfilePage} />
                </Switch>
            </Router>
        );
    }
}

const routedMyProgramPage = withRouter(MyProgramPage);
export { routedMyProgramPage as MyProgramPage };
