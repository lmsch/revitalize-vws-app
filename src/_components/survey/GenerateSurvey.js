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
import { IntegerRange } from './IntegerRange';
import { TextArea } from "./TextArea";

// Survey component map
const surveyMap = {
    'integer_range': IntegerRange,
    'exclusive_choices': ExclusiveChoices,
    'boolean': ExclusiveChoices,
    'text_area': TextArea,
};

/**
 * Dynamically render survey elements.
 */
function renderElement(element, classes) {
    const elementType = element.element_type;
    if (elementType === 'text') {
        return <p className={classes.questionPadding} dangerouslySetInnerHTML={{__html: element.text}}></p>;
    } else if (elementType === 'question_group') {
        const SurveyComponent = surveyMap[element.question_group_type];
        if (!element.number && !element.text){
            return <SurveyComponent model={element} />
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
                <SurveyComponent model={element} />
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
        const { model, classes } = this.props;
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
                        {renderElement(element, classes)}
                    </div>
                    )}
                    <div className={`${classes.submitSurveyContainer} ${classes.rowFlexContainer}`}>
                        <Button 
                            className={classes.submitSurveyButton}
                            variant="contained" 
                            color="primary"
                            onClick={_ => this.props.submit()}>
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
export { styledGenerateSurvey as GenerateSurvey };
