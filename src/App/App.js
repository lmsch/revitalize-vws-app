/* LREACT IMPORTS */
import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
/* THIRD PARTY IMPORTS */
import CssBaseline from '@material-ui/core/CssBaseline';
/* LOCAL IMPORTS */
import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { AboutUsPage } from '../AboutUsPage';
import { LoginPage } from '../LoginPage';
import {SurveysPage} from "../SurveysPage";
import {ContactPage} from "../ContactPage";
import {DietaryJournalPage} from "../DietaryJournalPage";
import {GoalProgressPage} from "../GoalProgressPage";
import {LabValuesPage} from "../LabValuesPage";
import {MyProfilePage} from "../MyProfilePage";
import {SupportPage} from "../SupportPage";

class App extends React.Component {
    constructor(props) {
        super(props);
        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
        return (
            <Router history={history}>
                <div>
                    <CssBaseline />
                    <PrivateRoute exact path="/" component={AboutUsPage} />
                    <PrivateRoute exact path="/" component={SurveysPage} />
                    <PrivateRoute exact path="/" component={ContactPage} />
                    <PrivateRoute exact path="/" component={DietaryJournalPage} />
                    <PrivateRoute exact path="/" component={GoalProgressPage} />
                    <PrivateRoute exact path="/" component={LabValuesPage} />
                    <PrivateRoute exact path="/" component={MyProfilePage} />
                    <PrivateRoute exact path="/" component={SupportPage} />
                    <Route path="/login" component={LoginPage} />
                </div>
            </Router>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 
