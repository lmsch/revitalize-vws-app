// ---common.js
// contains the theme/layout.


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
    questionPadding: {
        padding: '20px 0 20px 0',
    },
    questionJustify: {
        justifyContent: 'flex-start',
        flexWrap: 'nowrap',
        overflow: 'auto',
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
    const initialResponse = String(model.question_group_type_data.initial);
    const initialState = {};
    model.questions.forEach((question, i) => {
        initialState[String(i)] = initialResponse >= 0 ? initialResponse : '';
        question.response = initialResponse;
    });
    return initialState;
}

