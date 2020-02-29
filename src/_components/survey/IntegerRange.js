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
    };

    /**
     * Renders the component based on various model conditions.
     */
    render() {
        const { classes, model } = this.props;
        const questionData = model.question_group_type_data;
        return (
            <React.Fragment>
                {model.questions?.map((question, i) =>
                    <div 
                        className={`${classes.questionPadding} ${classes.colFlexContainer} ${classes.multiLineJustify}`}
                        key={i}>
                        <Typography 
                            component="p" 
                            variant="subtitle1"
                            dangerouslySetInnerHTML={{__html: question.number ? 
                            `<b>${question.number}</b>: ${question.text}` : `${question.text}`}}>
                        </Typography>
                        <div className={classes.rowFlexContainer}>
                            <Typography 
                                component="h6" 
                                variant="subtitle1">
                                {questionData.annotations?.minimum}
                            </Typography>
                            <FormControl 
                                component="fieldset">
                                <RadioGroup 
                                    className={`${classes.rowFlexContainer} ${classes.questionJustify}`}
                                    name={String(i)}
                                    value={this.state[i]} 
                                    onChange={this.handleChange}>
                                    {questionData.labels?.map((label, j) => 
                                    <FormControlLabel
                                        className={classes.integerScaleMargin}
                                        key={j}
                                        label={label}
                                        value={String(j + 1)}
                                        control={<Radio color="primary" />}
                                        labelPlacement="bottom"/>
                                    )}
                                </RadioGroup>
                            </FormControl>
                            <Typography 
                                component="h6" 
                                variant="subtitle1">
                                {questionData.annotations?.maximum}
                            </Typography>
                        </div>
                    </div>
                )}
            </React.Fragment> 
        );
    }
}

IntegerRange.propTypes = {
    model: PropTypes.object.isRequired,
};

const styledIntegerRange = withStyles(styles)(IntegerRange);
export { styledIntegerRange as IntegerRange };
