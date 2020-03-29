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
        if(this.props.options?.length <= 0) {
            return null;
        }
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
                            data={this.props.data}
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
