// Survey styles.
export const styles = (theme) => ({
    rowFlexContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    colFlexContainer: {
        display: 'flex',
        flexDirection: 'column',
    },
    exclusiveChoiceGroup: {
        justifyContent: 'space-evenly',
        flexWrap: 'nowrap',
    },
    questionPadding: {
        padding: '20px 0 20px 0',
    },
    integerScaleMargin: {
        margin: '0 5px 0 5px'
    },
    labelNotVisible: {
        visibility: 'hidden',
    },
    formControlBlock: {
        display: 'block',
        width: '100%',
    },
    multiLineJustify: {
        justifyContent: 'start'
    },
    questionJustify: {
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
    },
    availableSurveysRow: {
        '&:hover': {
            cursor: 'pointer',
        }
    },
    availableSurveysSelected: {
        backgroundColor: `${theme.palette.grey[300]} !important`,
    },
    doSurveyContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    doSurveyButton: {
        marginLeft: '10px',
    },
    submitSurveyContainer: {
        justifyContent: 'center',
        marginTop: '30px',
    },
    submitSurveyButton: {
        minWidth: '200px',
        width: '33%'
    }
});

/**
 * Setup state to initial (as defined by API) for each question. Mapped as [question_index: number]: [radio_value: number].
 */
export function setupInitialState(model) {
    const initialResponse = model.question_group_type_data.initial;
    const initialState = {};
    model.questions.forEach((question, i) => {
        initialState[i] = initialResponse ? initialResponse : '';
        question.response = initialResponse;
    });
    return initialState;
}

