/* REACT IMPORTS */
import React from 'react';
/* THIRD PARTY IMPORTS */
import TextField from '@material-ui/core/TextField';
import {withStyles} from "@material-ui/core/styles";
/* LOCAL IMPORTS */
import {setupInitialState, styles} from './common';
import PropTypes from "prop-types";


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
        const {classes, model} = this.props;
        const questionData = model.question_group_type_data;

        return (
            <form className={classes.root} autoComplete="off">
                {model.questions?.map((question, i) =>
                    <div>
                        "Questions testing ?"
                        dangerouslySetInnerHTML={{
                        __html: question.number ?
                            `<b>${question.number}</b>: ${question.text}` : `${question.text}`
                    }}>
                        <TextField
                            id="outlined-textarea"
                            label="Enter text here"
                            placeholder="text"
                            multiline
                            variant="filled"
                        />
                    </div>
                )}
            </form>
        )
    };
}
TextArea.propTypes = {
    model: PropTypes.object.isRequired,
};

const styledTextArea = withStyles(styles)(TextArea);
export { styledTextArea as TextArea };


