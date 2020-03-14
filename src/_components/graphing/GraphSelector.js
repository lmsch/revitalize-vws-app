/* REACT IMPORTS */
import React from 'react';
/* THIRD PARTY IMPORTS */
import * as moment from 'moment';
import {
    withStyles,
    Card,
    CardHeader,
    CardContent,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
} from '@material-ui/core';
/* LOCAL IMPORTS */
import { styles } from './common';

class GraphSelector extends React.Component {

    state = {
        min_date: '',
        max_date: '',
        selector: '',
    };

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
        if(this.props.handleChange) {
            this.props.handleChange(this.state);
        }
    };

    componentDidMount() {
        const { options } = this.props;
        if (options?.length > 0) {
            this.setState({selector: options[0]});
        }
        if(this.props.handleChange) {
            this.props.handleChange(this.state);
        }
    }

    render() {
        const { classes, options } = this.props;
        return (
            <Card>
                <CardHeader
                    title={this.props.title}
                    titleTypographyProps={{
                        component: "h1",
                        variant: "h4",
                    }} />
                <CardContent>
                    <div className={classes.selectorControlsContainer}>
                        <FormControl>
                            <InputLabel>{this.props.selectMessage}</InputLabel>
                            <Select
                                name="selector"
                                value={this.state.selector}
                                onChange={this.handleChange}>
                                {options?.map(option => 
                                <MenuItem 
                                    key={option} 
                                    value={option}>
                                    {option}
                                </MenuItem>
                                )}
                            </Select>
                        </FormControl>
                        <form noValidate>
                            <TextField 
                                name="min_date"
                                className={classes.timeRangeControls}
                                label="Starting:"
                                type="date"
                                defaultValue={moment().subtract(1, 'month').format('YYYY-MM-DD')}
                                onChange={this.handleChange}
                                InputLabelProps={{shrink: true}} />
                             <TextField
                                name="max_date"
                                className={classes.timeRangeControls}
                                label="Ending:"
                                type="date"
                                defaultValue={moment().format('YYYY-MM-DD')}
                                onChange={this.handleChange}
                                InputLabelProps={{shrink: true}} />
                        </form>
                    </div>
                    {this.props.children}
                </CardContent>
            </Card>
        );
    }

}

const styledGraphSelector = withStyles(styles)(GraphSelector);
export { styledGraphSelector as GraphSelector };
