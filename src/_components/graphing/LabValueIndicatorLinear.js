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

    handleChange = change => {
        this.props.handleChange(change);
    };

    render() {
        return (
            <GraphSelector
                title="Lab Value Progress"
                options={this.props.options}
                handleChange={this.handleChange}>
                <ResponsiveContainer width="100%" height={400}>
                    <ScatterChart className={this.props.classes.graphMargin}>
                        <XAxis
                            dataKey="time"
                            domain={['auto', 'auto']}
                            name="Date"
                            tick={false}
                            type="string"/>
                        <YAxis
                            dataKey="indicator"
                            name="Indicator" />
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
    options: PropTypes.array.isRequired,
}

const styledLabValueIndicatorLinear = withStyles(styles)(LabValueIndicatorLinear);
export { styledLabValueIndicatorLinear as LabValueIndicatorLinear };
