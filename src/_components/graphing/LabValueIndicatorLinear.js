// ---labvalueindicator.js
// makes use of parameteres such as options, data and classes and checks if they are empty and calls upon the graph selector method to graph them, if they are not empty.
// Also makes use of the scatterchart to graph the indicator vs the time.


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

class LabValueIndicatorLinear extends React.Component {

    handleChange = change => {
        this.props.handleChange(change);
    };

    render() {
        const { options, data, classes } = this.props;
        if(!options || options.length <= 0) {
            return null;
        }
        if(!data || data.length <= 1) {
            return (
                <GraphSelector 
                    title="Lab Value Progress"
                    options={options}
                    handleChange={this.handleChange}>
                    <div className={classes.noDataMessage}><b>No data to display.</b></div>
                </GraphSelector>
            );
        }
        return (
            <GraphSelector
                title="Lab Value Progress"
                options={options}
                handleChange={this.handleChange}>
                <ResponsiveContainer width="100%" height={400}>
                    <ScatterChart className={classes.graphMargin}>
                        <YAxis 
                            dataKey={'value'}
                            name="Indicator"
                            type="number"/>
                        <XAxis
                            domain = {['auto', 'auto']}
                            dataKey={point => moment.utc(point.time).unix()}
                            tick={false}
                            name="Time"
                            type="number" />
                        <Scatter
                            data={data}
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
}

const styledLabValueIndicatorLinear = withStyles(styles)(LabValueIndicatorLinear);
export { styledLabValueIndicatorLinear as LabValueIndicatorLinear };
