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
    }

    //TODO: Make API Call
    handleGraphUpdate = (change) => {
        console.log(change);
    }

    componentDidMount() {
        apiCall('/lab_values/', { method: 'GET' })
            .then(response => {
                this.setState({labValueHistory: response});
                console.log(response);
            });
    }

    render() {
        const { labValueHistory } = this.state;
        if(!labValueHistory) {
            return <div className="progress-spinner-container"><CircularProgress size={100} /></div>
        }
        return (
            <React.Fragment>
                {labValueHistory?.length > 0 ?
                <NotifyDisplay
                    header="Most recent submitted lab value:"
                    icon={false}
                    errors={[`${labValueHistory[0].name} on ${moment.utc(labValueHistory[0].time).local().format('LLL')}`]} />
                    : null
                }
                <LabValueIndicatorLinear
                    options={[]}
                    handleChange={this.handleGraphUpdate}/>
                <LabValueHistory 
                    labValueHistory={[]} />
            </React.Fragment>
        );
    }
}

export { LabValuesPage };
