/* LREACT IMPORTS */
import React from 'react';
/* THIRD PARTY IMPORTS */
import { Router, Switch, withRouter } from 'react-router-dom';
/* LOCAL IMPORTS */
import { PrivateRoute } from '../_components';
import { SurveysPage } from "../SurveysPage";
import { DietaryJournalPage} from "../DietaryJournalPage";
import { GoalProgressPage } from "../GoalProgressPage";
import { LabValuesPage } from "../LabValuesPage";
import { MyProfilePage } from "../MyProfilePage";
import { history } from '../_helpers/history';

class MyProgramPage extends React.Component {
    
    render() {
        const { path } = this.props.match;
        return (
            <Router history={history}>
                <Switch>
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

const routedMyProgramPage = withRouter(MyProgramPage)
export { routedMyProgramPage as MyProgramPage };
