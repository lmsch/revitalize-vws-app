/**
 * TEXT AREA: A component for the user to enter short answer questions in a survey. Manipulates model
 * when MATERIAL-UI text area is typed in.
 */

/* REACT IMPORTS */
import React from 'react';
import PropTypes from "prop-types";
/* THIRD PARTY IMPORTS */
import {
    TextField,
    Typography,
    withStyles,
}from '@material-ui/core';
/* LOCAL IMPORTS */
import {
    setupInitialState, 
    styles,
} from './common';

class TextArea extends React.Component {

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
                        <TextField
                            name={String(i)}
                            value={this.state[i]}
                            onChange={this.handleChange} 
                            autoComplete="off"
                            fullWidth
                            multiline
                            rows="3"
                            placeholder="Type your answer here."
                            variant="outlined" />
                    </div>
                )}
            </React.Fragment>
        )
    };
}

TextArea.propTypes = {
    model: PropTypes.object.isRequired,
};

const styledTextArea = withStyles(styles)(TextArea);
export { styledTextArea as TextArea };
