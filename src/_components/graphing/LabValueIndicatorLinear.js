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
