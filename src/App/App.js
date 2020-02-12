/* LREACT IMPORTS */
import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
/* THIRD PARTY IMPORTS */
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
/* LOCAL IMPORTS */
import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { AboutUsPage } from '../AboutUsPage';
import { LoginPage } from '../LoginPage';
import DiscreteSlider from '../_components/vSlider';
import IconLabelTabs from '../_components/headerComponent';

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
