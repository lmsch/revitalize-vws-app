/* REACT IMPORTS */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom'
/* THIRD PARTY IMPORTS */
import { SnackbarProvider } from 'notistack';
/* LOCAL IMPORTS */
import './index.css';
import { App } from './App/App';
import * as serviceWorker from './serviceWorker';
import { store, history } from './_helpers';

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <SnackbarProvider anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                <App />
            </SnackbarProvider>
        </Router>
    </Provider>, 
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
