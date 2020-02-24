/* REACT IMPORTS */
import React from 'react';
import PropTypes from 'prop-types';

/* THIRD PARTY IMPORTS */
import { Typography } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";

/* LOCAL IMPORTS */
import { styles } from './common';
import { ExclusiveChoices } from './ExclusiveChoices';
import { IntegerRange } from './IntegerRange';

// Survey component map
const surveyMap = {
    'integer_range': IntegerRange,
    'exclusive_choices': ExclusiveChoices,
    'boolean': ExclusiveChoices,
};

/**
 * Dynamically render survey elements.
 */
function renderElement(element) {
    const elementType = element.element_type;
    if (elementType === 'text') {
        return <p dangerouslySetInnerHTML={{__html: element.text}}></p>;
    } else if (elementType === 'question_group') {
        const SurveyComponent = surveyMap[element.question_group_type];
        return (
            <React.Fragment>
                <Typography 
                    component="p" 
                    variant="subtitle1"
                    dangerouslySetInnerHTML={{__html: element.number ? 
                    `${element.number}: ${element.text} ` : `${element.text}`}}>
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
        const { model } = this.props;
        return (
            <div>
                <Typography 
                    component="h1" 
                    variant="h3">
                    {model.name}
                </Typography>
                <p dangerouslySetInnerHTML={{__html: model.description}}></p>
                {model.elements.map((element, i) =>
                    <div key={i}>
                        {renderElement(element)}
                    </div>
                )}
            </div>
        );
    }
}

GenerateSurvey.propTypes = {
    model: PropTypes.object.isRequired,
};

const styledGenerateSurvey = withStyles(styles)(GenerateSurvey);
export { styledGenerateSurvey as GenerateSurvey };
