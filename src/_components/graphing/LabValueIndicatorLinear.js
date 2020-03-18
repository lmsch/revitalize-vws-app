/* REACT IMPORTS */
import React from 'react';
import PropTypes from 'prop-types';
/* THIRD PARTY IMPORTS */
import {
    ResponsiveContainer,
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
} from 'recharts';
import { withStyles } from '@material-ui/core';
import * as moment from 'moment';
/* LOCAL IMPORTS */
import { GraphSelector } from './GraphSelector';
import { styles } from './common';

//TODO: Use endpoints rather than fake data.
const labValueFakeData = [
    { indicator: 14, time: 1503617297689 },
    { indicator: 15, time: 1503616962277 },
    { indicator: 15, time: 1503616882654 },
    { indicator: 20, time: 1503613184594 },
    { indicator: 15, time: 1503611308914 },
]

class LabValueIndicatorLinear extends React.Component {

    state = {
        min_date: '',
        max_date: '',
        selector: '',
    };

    handleChange = change => {
        this.setState({...change});
        if(this.props.handleChange) {
            this.props.handleChange(change);
        }
    }

    render() {
        return (
            <GraphSelector
                title="Lab Value Progress"
                selectMessage="Select a Lab Value."
                options={this.props.options}
                handleChange={this.handleChange}>
                <ResponsiveContainer width="70%" height={400}>
                    <ScatterChart className={this.props.classes.graphMargin}>
                        <XAxis
                            dataKey="time"
                            domain={['auto', 'auto']}
                            name="Date"
                            tickFormatter = {date => moment(date).format('YYYY-MM-DD')}
                            type="string"/>
                        <YAxis
                            dataKey="indicator"
                            name="Indicator"
                            tick={false} />
                        <Scatter
                            data={labValueFakeData}
                            line={{ stroke: 'black' }}
                            lineJointType="monotoneX"
                            lineType="joint"/>
                    </ScatterChart>
                </ResponsiveContainer>
            </GraphSelector>
        );
    }
}

LabValueIndicatorLinear.propTypes = {
    handleChange: PropTypes.func.isRequired,
    options: PropTypes.object.isRequired,
}

const styledLabValueIndicatorLinear = withStyles(styles)(LabValueIndicatorLinear);
export { styledLabValueIndicatorLinear as LabValueIndicatorLinear };
