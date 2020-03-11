/* REACT IMPORTS */
import React from 'react';
/* THIRD PARTY IMPORTS */
import TextField from '@material-ui/core/TextField';
import {withStyles} from "@material-ui/core/styles";
/* LOCAL IMPORTS */
import {styles} from './common';


class TextArea extends React.Component {

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
        this.props.model.questions[e.target.name].response = e.target.value;
    };

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

const styledTextArea = withStyles(styles)(TextArea);
export { styledTextArea as TextArea };


