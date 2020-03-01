/* REACT IMPORTS */
import React from 'react';
import { connect } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
/* LOCAL IMPORTS */
import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute, Footer, Header } from '../_components';
import { MyProgramPage } from '../MyProgramPage';
import { SupportPage } from '../SupportPage';
import { ContactPage } from '../ContactPage';
import { AboutUsPage } from '../AboutUsPage';

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
            <div className="app-layout">
                <Header />
                <main>
                    <Router history={history}>
                        <Switch>
                            <Route path="/support" component={SupportPage} />
                            <Route path="/contact" component={ContactPage} />
                            <PrivateRoute path="/program" component={MyProgramPage} />
                            <Route path="/" component={AboutUsPage} />
                        </Switch>
                    </Router>
                </main>
                <Footer />
            </div>
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
