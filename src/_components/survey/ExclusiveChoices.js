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

const styles  = theme => ({
    formControl: {
        display: 'block',
    },
    formControlLabel: {
        marginRight: '0',
    },
    radioGroup: {
        justifyContent: 'space-around',
        flexWrap: 'nowrap',
    },
    labels: {
        display: 'flex',
        justifyContent: 'space-around',
    }
});

class ExclusiveChoices extends React.Component {

    /**
     * Setup state to initial (as defined by API) for each question. Mapped as [question_index: number]: [radio_value: number].
     */
    constructor(props) {
        super(props);
        const { model } = props;
        const initialResponse = model.question_group_type_data.initial;
        const initialState = {};
        model.questions.forEach((question, i) => {
            initialState[i] = initialResponse;
            question.response = initialResponse;
        });
        this.state = initialState;
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
                            {questionData.labels.map((label, j) => 
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
                <div>
                    <Grid 
                        container
                        spacing={2}
                        direction="row">
                        <Grid 
                            item
                            xs={5} />
                        <Grid 
                            item
                            xs={7}>
                            <div className={classes.labels}>
                                {questionData.labels.map((label, i) =>
                                    <Typography 
                                        key={i}
                                        component="h6" 
                                        variant="subtitle1">
                                            {label}
                                    </Typography>
                                )}
                            </div>
                        </Grid>   
                    </Grid>
                    {model.questions.map((question, i) =>
                        <Grid 
                            key={i}
                            container
                            spacing={2} 
                            direction="row">
                            <Grid 
                                item
                                xs={5}>
                                <Typography 
                                    component="p" 
                                    variant="subtitle1"
                                    dangerouslySetInnerHTML={{__html: question.number ? 
                                    `${question.number}: ${question.text} ` : `${question.text}`}}>
                                </Typography>
                            </Grid>
                            <Grid 
                                item
                                xs={7}>
                                <FormControl 
                                    component="fieldset"
                                    className={classes.formControl}>
                                    <RadioGroup 
                                        row
                                        className={classes.radioGroup}
                                        name={String(i)}
                                        value={this.state[i]} 
                                        onChange={this.handleChange}>
                                        { questionData.labels.map((_, j) => 
                                            <FormControlLabel
                                                key={j}
                                                value={String(j + 1)}
                                                control={<Radio color="primary" />}
                                                labelPlacement="top"/>
                                        )}
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </Grid>
                    )}
                </div> 
            );
        }
    }

}

ExclusiveChoices.propTypes = {
    model: PropTypes.object.isRequired,
};

const styledExclusiveChoices = withStyles(styles)(ExclusiveChoices);
export { styledExclusiveChoices as ExclusiveChoices };
