/**
 * LAB VALUES PAGE: Contains various components related to a user's lab values, such as:
 *  Most recent submitted lab value
 *  Lab value progress graphs
 *  Lab value history
 */

/* REACT IMPORTS */
import React from 'react';
/* THIRD PARTY IMPORTS */
import { CircularProgress } from '@material-ui/core';
import * as moment from 'moment';
/* LOCAL IMPORTS */
import { apiCall } from '../_helpers';
import { LabValueIndicatorLinear, LabValueHistory, NotifyDisplay } from '../_components';

class LabValuesPage extends React.Component {

    state = {
        labValueHistory: null,
        graphData: null,
        labValueIndicators: null,
    }

    // If user has selected a new date range or lab value to graph, make an API call to retrieve the data to graph.
    handleGraphUpdate = (change) => {
        if(Number(change.selector) > 0 && change.min_date && change.max_date) {
            const range = JSON.stringify({min_date: change.min_date, max_date: change.max_date})
            apiCall(`/lab-values/${change.selector}/user/`, { method: 'POST', body: range })
                .then(response => this.setState({graphData: response}));
        }
    }

    // API calls for labValueHistory and available lab values to graph.
    componentDidMount() {
        apiCall('/lab-values/user/', { method: 'GET' })
            .then(response => this.setState({labValueHistory: response}));
        apiCall('/indicators/lab-value/user/', { method: 'GET' })
            .then(response => this.setState({labValueIndicators: response}));
    }

    render() {
        const { labValueHistory, labValueIndicators, graphData } = this.state;
        // Show spinner if not loaded yet.
        if(!labValueHistory || !labValueIndicators) {
            return <div className="progress-spinner-container"><CircularProgress size={100} /></div>
        }
        return (
            <React.Fragment>
                {labValueHistory?.length > 0 ?
                <NotifyDisplay
                    header="Most recent lab value:"
                    icon={false}
                    items={[<span><b>{labValueHistory[0].name}</b> on <b>{moment.utc(labValueHistory[0].time).local().format('LLL')}</b></span>]} />
                    : null
                }
                <LabValueIndicatorLinear
                    options={labValueIndicators}
                    data={graphData}
                    handleChange={this.handleGraphUpdate}/>
                <LabValueHistory 
                    labValueHistory={labValueHistory} />
            </React.Fragment>
        );
    }
}

export { LabValuesPage };
