/* REACT IMPORTS */
import React from 'react';
import PropTypes from 'prop-types';
/* THIRD PARTY IMPORTS */
import {
    Select,
    MenuItem,
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

    determineAnnotation(index, questionData) {
        const { labels, annotations } = questionData;
        if(index === 0) {
            return <span>{labels[index]}&emsp;<b>{annotations?.minimum}</b></span>
        } else if(index === labels.length - 1) {
            return <span>{labels[index]}&emsp;<b>{annotations?.maximum}</b></span>
        } else {
            return labels[index];
        }
    }

    /**
     * Renders the component based on various model conditions.
     */
    render() {
        const { classes, model, isMobile } = this.props;
        const questionData = model.question_group_type_data;
        return (
            <React.Fragment>
                {model.questions?.map((question, i) =>
                    <div
                        className={`${classes.questionPadding} ${classes.colFlexContainer} ${classes.questionJustify}`}
                        key={i}>
                        <Typography
                            component="p"
                            variant="subtitle1"
                            dangerouslySetInnerHTML={{
                                __html: question.number ?
                                    `<b>${question.number}</b>: ${question.text}` : `${question.text}`
                            }}>
                        </Typography>
                        <FormControl
                            component="fieldset">
                            {isMobile ?
                            <Select
                                variant="outlined"
                                name={String(i)}
                                value={this.state[i]}
                                onChange={this.handleChange}>
                                {questionData.labels?.map((label, j) => 
                                <MenuItem 
                                    key={j} 
                                    value={String(j + 1)}>
                                    {this.determineAnnotation(j, questionData)}
                                </MenuItem>
                                )}
                            </Select>
                            :
                            <RadioGroup
                                className={`${classes.rowFlexContainer} ${classes.questionJustify}`}
                                name={String(i)}
                                value={this.state[i]}
                                onChange={this.handleChange}>
                                <Typography
                                    component="h6"
                                    variant="subtitle1">
                                    {questionData.annotations?.minimum}
                                </Typography>
                                {questionData.labels?.map((label, j) =>
                                    <FormControlLabel
                                        className={classes.integerScaleMargin}
                                        key={j}
                                        label={label}
                                        value={String(j + 1)}
                                        control={<Radio color="primary" />}
                                        labelPlacement="bottom" />
                                )}
                                <Typography
                                    component="h6"
                                    variant="subtitle1">
                                    {questionData.annotations?.maximum}
                                </Typography>
                            </RadioGroup>
                            }
                        </FormControl>
                    </div>
                )}
            </React.Fragment>
        );
    }
}

ExclusiveChoices.propTypes = {
    model: PropTypes.object.isRequired,
};

const styledExclusiveChoices = withStyles(styles)(ExclusiveChoices);
export { styledExclusiveChoices as ExclusiveChoices };
