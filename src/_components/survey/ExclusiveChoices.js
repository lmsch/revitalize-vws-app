/* REACT IMPORTS */
import React from 'react';
import PropTypes from 'prop-types';

/* THIRD PARTY IMPORTS */
import { 
    Radio,
    RadioGroup,
    FormControl,
    FormControlLabel,
    Typography,
    Grid
} from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";

/* LOCAL IMPORTS */
import {
    styles,
    setupInitialState,
} from './common';

class ExclusiveChoices extends React.Component {

    constructor(props) {
        super(props);
        this.state = setupInitialState(props.model);
    }

    /**
     * Sets state and updates model with new selection.
     */
    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
        this.props.model.questions[e.target.name].response = e.target.value;
    };

    /**
     * Renders the component based on various model conditions.
     */
    render() {
        const { classes, model } = this.props;
        const questionData = model.question_group_type_data;
        if (model.number_of_questions === 1) {
            const question = model.questions[0];
            return (
                <div>
                    <Typography 
                        component="p" 
                        variant="subtitle1"
                        dangerouslySetInnerHTML={{__html: question.number ? 
                        `${question.number}: ${question.text} ` : `${question.text}`}}>
                    </Typography>
                    <FormControl 
                        component="fieldset"
                        className={classes.formControl}>
                        <RadioGroup 
                            name={String(0)}
                            value={this.state[0]} 
                            onChange={this.handleChange}>
                            {questionData.labels?.map((label, j) => 
                                <FormControlLabel
                                    className={classes.formControlLabel}
                                    key={j}
                                    label={label}
                                    value={String(j + 1)}
                                    control={<Radio color="primary" />}
                                    labelPlacement="start"/>
                            )}
                        </RadioGroup>
                    </FormControl>
                </div>
            );
        } else {
            return (
                <Grid
                    container
                    directon="column">
                    {model.questions.map((question, i) =>
                        <Grid 
                            key={i}
                            item
                            container
                            alignItems="baseline">
                            <Grid 
                                item
                                xs={6}
                                className={classes.gridPaddingRight}>
                                <Typography 
                                    component="p" 
                                    variant="subtitle1"
                                    dangerouslySetInnerHTML={{__html: question.number ? 
                                    `${question.number}: ${question.text} ` : `${question.text}`}}>
                                </Typography>
                            </Grid>
                            <Grid 
                                item
                                xs={6}>
                                <FormControl 
                                    component="fieldset"
                                    className={classes.formControl}>
                                    <RadioGroup 
                                        row
                                        className={classes.radioGroupExclusive}
                                        name={String(i)}
                                        value={this.state[i]} 
                                        onChange={this.handleChange}>
                                        {questionData.labels?.map((label, j) => 
                                            <FormControlLabel
                                                key={j}
                                                classes={{label: 
                                                    i? classes.labelNotVisible : ''
                                                }}
                                                value={String(j + 1)}
                                                label={
                                                    <Typography 
                                                        component="h6" 
                                                        variant="subtitle1">
                                                        {label}
                                                    </Typography>
                                                }
                                                control={<Radio color="primary" />}
                                                labelPlacement="top"/>
                                        )}
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </Grid>
                    )}
                </Grid> 
            );
        }
    }
}

ExclusiveChoices.propTypes = {
    model: PropTypes.object.isRequired,
};

const styledExclusiveChoices = withStyles(styles)(ExclusiveChoices);
export { styledExclusiveChoices as ExclusiveChoices };
