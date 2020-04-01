/* REACT IMPORTS */
import React from 'react';
/* THIRD PARTY IMPORTS */
import { CircularProgress } from '@material-ui/core';
import * as moment from 'moment';
/* LOCAL IMPORTS */
import { apiCall, handleDateSort } from '../_helpers';
import { LabValueIndicatorLinear, LabValueHistory, NotifyDisplay } from '../_components';

class LabValuesPage extends React.Component {

    state = {
        labValueHistory: null,
        graphData: null,
        labValueIndicators: null,
    }

    handleGraphUpdate = (change) => {
        if(Number(change.selector) > 0 && change.min_date && change.max_date) {
            const range = JSON.stringify({min_date: change.min_date, max_date: change.max_date})
            apiCall(`/lab-values/${change.selector}/user/`, { method: 'POST', body: range })
                .then(response => this.setState({graphData: response}));
        }
    }

    componentDidMount() {
        apiCall('/lab-values/user/', { method: 'GET' })
            .then(response => this.setState({labValueHistory: response}));
        apiCall('/indicators/lab-value/user/', { method: 'GET' })
            .then(response => this.setState({labValueIndicators: response}));
    }

    render() {
        const { labValueHistory, labValueIndicators, graphData } = this.state;
        let mostRecentLabValue;
        if(!labValueHistory || !labValueIndicators) {
            return <div className="progress-spinner-container"><CircularProgress size={100} /></div>
        }
        if(labValueHistory.length > 0) {
            mostRecentLabValue = handleDateSort(labValueHistory, 'desc')[0];
        }
        return (
            <React.Fragment>
                {mostRecentLabValue ?
                <NotifyDisplay
                    header="Most recent lab value:"
                    icon={false}
                    errors={[<span><b>{mostRecentLabValue.name}</b> on <b>{moment.utc(mostRecentLabValue.time).local().format('LLL')}</b></span>]}/>
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
