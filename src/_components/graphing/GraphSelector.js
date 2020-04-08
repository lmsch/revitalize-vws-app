/**
 * GRAPH SELECTOR: A component that can be reused with various RECHART graphs.
 * Contains a multiselect component to select that date to be graphed, as well as two
 * forms to select a date range of data to display. Emits a change object via callback 
 * whenever one of these forms changes.
 */

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

    // Default range is set to the current date and one month in the past.
    state = {
        min_date: moment().subtract(1, 'month').format('YYYY-MM-DD'),
        max_date: moment().format('YYYY-MM-DD'),
        selector: '',
    };

    // Sends the change to parent, with dates converted to UTC format.
    callBack = () => {
        if(this.props.handleChange) {
            this.props.handleChange({
                min_date: moment.utc(this.state.min_date).startOf('day').format(),
                max_date: moment.utc(this.state.max_date).endOf('day').format(),
                selector: this.state.selector,
            });
        }
    }

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value}, this.callBack);
    };

    componentDidMount() {
        this.setInitialSelection();
    }

    componentDidUpdate() {
        this.setInitialSelection();
    }

    /**
     * If props.options (the list of possible data sets to graph) is defined and has items, 
     * select the first option provided by default and sets the state accordingly.
     */
    setInitialSelection() {
        const { options } = this.props;
        const { selector } = this.state;
        if (options?.length > 0 && !selector) {
            this.setState({selector: String(options[0].id)}, this.callBack);
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
                        <FormControl className={classes.controlsMargin}>
                            <InputLabel>{this.props.selectMessage}</InputLabel>
                            <Select
                                name="selector"
                                value={this.state.selector}
                                onChange={this.handleChange}>
                                {options?.map(option => 
                                <MenuItem 
                                    key={option.id} 
                                    value={option.id}>
                                    {option.name}
                                </MenuItem>
                                )}
                            </Select>
                        </FormControl>
                        <form noValidate>
                            <TextField 
                                name="min_date"
                                className={classes.controlsMargin}
                                label="Starting:"
                                type="date"
                                defaultValue={this.state.min_date}
                                onChange={this.handleChange}
                                InputLabelProps={{shrink: true}} />
                             <TextField
                                name="max_date"
                                className={classes.controlsMargin}
                                label="Ending:"
                                type="date"
                                defaultValue={this.state.max_date}
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
