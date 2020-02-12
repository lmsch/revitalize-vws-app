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

class IntegerRange extends React.Component {

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
        console.log(this.props.model.questions);
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
    `               <Typography 
                        component="p" 
                        variant="subtitle1"
                        dangerouslySetInnerHTML={{__html: question.number ? 
                        `${question.number}: ${question.text} ` : `${question.text}`}}>
                    </Typography>
                    <div className={classes.integerScale}>
                        <Typography 
                            className={classes.integerScaleChild}
                            component="h6" 
                            variant="subtitle1">
                            {questionData.annotations.minimum}
                        </Typography>
                        <FormControl 
                            className={classes.integerScaleChild}
                            component="fieldset">
                            <RadioGroup 
                                row
                                className={classes.radioGroupInteger}
                                name={String(0)}
                                value={this.state[0]} 
                                onChange={this.handleChange}>
                                {questionData.labels.map((label, j) => 
                                    <FormControlLabel
                                        className={classes.formControlLabel}
                                        key={j}
                                        label={label}
                                        value={String(j + 1)}
                                        control={<Radio color="primary" />}
                                        labelPlacement="bottom"/>
                                )}
                            </RadioGroup>
                        </FormControl>
                        <Typography 
                            className={classes.integerScaleChild}
                            component="h6" 
                            variant="subtitle1">
                            {questionData.annotations.maximum}
                        </Typography>`
                    </div>
                </div>
            );
        } else {
            return (
                <Grid
                    container
                    directon="column">
                    {model.questions.map((question, i) =>
                        <Grid 
                            className={classes.gridPaddingBottom}
                            key={i}
                            item
                            container
                            alignItems="center">
                            <Grid 
                                item
                                xs={4}
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
                                xs={8}>
                                <div className={classes.integerScale}>
                                    <Typography 
                                        className={classes.integerScaleChild}
                                        component="h6" 
                                        variant="subtitle1">
                                        {questionData.annotations.minimum}
                                    </Typography>
                                    <FormControl 
                                        className={classes.integerScaleChild}
                                        component="fieldset">
                                        <RadioGroup 
                                            row
                                            className={classes.radioGroupInteger}
                                            name={String(i)}
                                            value={this.state[i]} 
                                            onChange={this.handleChange}>
                                            {questionData.labels.map((label, j) => 
                                                <FormControlLabel
                                                    className={classes.formControlLabel}
                                                    key={j}
                                                    label={label}
                                                    value={String(j + 1)}
                                                    control={<Radio color="primary" />}
                                                    labelPlacement="bottom"/>
                                            )}
                                        </RadioGroup>
                                    </FormControl>
                                    <Typography 
                                        className={classes.integerScaleChild}
                                        component="h6" 
                                        variant="subtitle1">
                                        {questionData.annotations.maximum}
                                    </Typography>`
                                </div>
                            </Grid>
                        </Grid>
                    )}
                </Grid> 
            );
        }
    }
}

IntegerRange.propTypes = {
    model: PropTypes.object.isRequired,
};

const styledIntegerRange = withStyles(styles)(IntegerRange);
export { styledIntegerRange as IntegerRange };
