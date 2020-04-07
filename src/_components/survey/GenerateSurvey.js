/**
 * GENERATE SURVEY: Generates an entire survey based on a model, which is provided from the API (see API documentation).
 * A model is a list of elements. Elements are "sections" of a survey. Elements represent 1 or more questions of identical answer
 * structure (same answer options/labels). Depending on the type of the element (exclusive choice, integer range, boolean, etc.),
 * a corresponding component is generated dynamically to generate that element in the survey. For the types above, the component
 * would be Exclusive Choices.
 * An element can have a question number, question text, and description.
 * A question can have a question number, and of course, question text.
 * The element contains questionData that describes the labels of answers and any specific configuration data to that element.
 * Each component manipulates its section of the model. That model is eventually submitted to the API for validation. The model
 * contains all values selected by the user.
 * For more information, see README.
 * Props: 
 *  model: List of elements from API.
 *  submit: A callback function for when the user clicks to submit the survey.
 */

/* REACT IMPORTS */
import React from 'react';
import PropTypes from 'prop-types';
/* THIRD PARTY IMPORTS */
import { 
    Typography, 
    Card, 
    CardHeader, 
    CardContent,
    Button, 
    Divider,
} from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
/* LOCAL IMPORTS */
import { styles } from './common';
import { ExclusiveChoices } from './ExclusiveChoices';
import { withMediaQuery } from '../../_helpers';

// Survey component map.
const surveyMap = {
    'integer_range': ExclusiveChoices,
    'exclusive_choices': ExclusiveChoices,
    'boolean': ExclusiveChoices,
};

/**
 * Dynamically generate components based on type of elements in model.
 * @param {*} element - Element from list of elements in model.
 */
function renderElement(element, classes, isMobile) {
    const elementType = element.element_type;
    if (elementType === 'text') {
        return <p className={classes.questionPadding} dangerouslySetInnerHTML={{__html: element.text}}></p>;
    } else if (elementType === 'question_group') {
        const SurveyComponent = surveyMap[element.question_group_type];
        if (!element.number && !element.text){
            return <SurveyComponent 
                        model={element}
                        isMobile={isMobile} />
        }
        return (
            <React.Fragment>
                <Typography 
                    className={classes.questionPadding}
                    component="p" 
                    variant="subtitle1"
                    dangerouslySetInnerHTML={{__html: 
                        element.number ? `<b>${element.number}</b>: ${element.text}` : element.text
                    }}>
                </Typography>
                <SurveyComponent
                    model={element}
                    isMobile={isMobile} />
            </React.Fragment>
        );
    } else {
        return null;
    }
}

class GenerateSurvey extends React.Component {

    /**
     * Renders the component based on various model conditions.
     */
    render() {
        const { model, classes, mediaQuery, submit } = this.props;
        return (
            <Card>
                <CardHeader 
                    title={model.name}
                    titleTypographyProps={{
                        component: "h1",
                        variant: "h4",
                    }} />
                <CardContent>
                    <p dangerouslySetInnerHTML={{__html: model.description}}></p>
                    {model.elements.map((element, i) =>
                    <div key={i}>
                        <Divider />
                        {renderElement(element, classes, mediaQuery)}
                    </div>
                    )}
                    <div className={`${classes.submitSurveyContainer} ${classes.rowFlexContainer}`}>
                        <Button 
                            className={classes.submitSurveyButton}
                            variant="contained" 
                            color="primary"
                            onClick={_ => submit()}>
                            Submit Survey
                        </Button>
                    </div>
                </CardContent>
            </Card>
        );
    }
}

GenerateSurvey.propTypes = {
    model: PropTypes.object.isRequired,
};

const styledGenerateSurvey = withStyles(styles)(GenerateSurvey);
const queriedStyledGenerateSurvey = withMediaQuery('(max-width:1200px)')(styledGenerateSurvey);
export { queriedStyledGenerateSurvey as GenerateSurvey };
