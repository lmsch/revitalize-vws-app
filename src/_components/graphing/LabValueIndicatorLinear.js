/**
 * LAB VALUE INDICATOR LINEAR GRAPH: A component displayed on the LabValuesPage that can be used to graph lab value history.
 * TODO: Add message for indicating the meaning of the graphed data (already exists in API).
 * Props:
 *  options: List of options displayed in multiselect. {id: any, name: string}[]
 *  data: Dataset to be graphed for the corresponding option. {time: string, value: number}[]
 *  handleChange: Callback function for when selection changes.
 */

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
                            dataKey={point => moment.utc(point.time).unix()} // Dataset is converted to UNIX epoch for graphing
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
                <div className={classes.graphHintMessageContainer}>
                    <b>{data[0].indicator_data.goal_message}</b>
                </div>
            </GraphSelector>
        );
    }
}

LabValueIndicatorLinear.propTypes = {
    handleChange: PropTypes.func.isRequired,
}

const styledLabValueIndicatorLinear = withStyles(styles)(LabValueIndicatorLinear);
export { styledLabValueIndicatorLinear as LabValueIndicatorLinear };
