/* REACT IMPORTS */
import React from 'react';
import {LabValueIndicatorLinear} from "../_components/graphing/LabValueIndicatorLinear";

const styles = () => ({
    labValueContainer: {
        display: 'flex',
        alignItems: 'flex-start',
    },
    labValueGraph: {
        flex: '1 0 50%',
    },
});

class LabValuesPage extends React.Component {

    state = {
        availableLabs: null,
        graphData: null,
    }

    //TODO: Make API Call
    handleGraphUpdate = (change) => {
        console.log(change);
    }

    componentDidMount() {
        /*apiCall('/available_surveys/', { method: 'GET'})
            .then(response => this.setState({availableSurveys: response}));*/
        this.setState({availableLabs: ["Lab Value 1", "Lab Value 2", "Lab Value 3", "Lab Value 4"]})

    }

    render() {
        const { availableLabs } = this.state;
        const { classes } = this.props;
        return (
            <React.Fragment>
                <LabValueIndicatorLinear
                            options={availableLabs}
                            handleChange={this.handleGraphUpdate}/>
            </React.Fragment>
        );
    }
}

export { LabValuesPage };
