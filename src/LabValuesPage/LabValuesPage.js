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

    handleGraphUpdate = (change) => {
        if(Number(change.selector) > 0 && change.min_date && change.max_date) {
            const range = JSON.stringify({min_date: change.min_date, max_date: change.max_date})
            //apiCall(`/lab-values/${change.selector}/user/`, { method: 'POST', body: range })
                //.then(response => console.log(response));
        }
    }

    componentDidMount() {
        apiCall('/lab-values/user/', { method: 'GET' })
            .then(response => this.setState({labValueHistory: response}));
        apiCall('/indicators/lab-value/user/', { method: 'GET' })
            .then(response => this.setState({labValueIndicators: response}));
    }

    render() {
        const { labValueHistory, labValueIndicators } = this.state;
        if(!labValueHistory) {
            return <div className="progress-spinner-container"><CircularProgress size={100} /></div>
        }
        return (
            <React.Fragment>
                {labValueHistory?.length > 0 ?
                <NotifyDisplay
                    header="Most recent lab value:"
                    icon={false}
                    errors={[<span><b>{labValueHistory[0].name}</b> on <b>{moment.utc(labValueHistory[0].time).local().format('LLL')}</b></span>]} />
                    : null
                }
                <LabValueIndicatorLinear
                    options={labValueIndicators}
                    data
                    handleChange={this.handleGraphUpdate}/>
                <LabValueHistory 
                    labValueHistory={labValueHistory} />
            </React.Fragment>
        );
    }
}

export { LabValuesPage };
