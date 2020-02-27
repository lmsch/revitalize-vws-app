// Survey styles.
export const styles = (theme) => ({
    formControl: {
        display: 'block',
    },
    formControlLabel: {
        margin: 0,
        paddingRight: '20px',
    },
    radioGroupExclusive: {
        justifyContent: 'space-around',
        flexWrap: 'nowrap',
    },
    radioGroupInteger: {
        flexWrap: 'nowrap',
    },
    labelNotVisible: {
        visibility: 'hidden',
    },
    gridPaddingRight: {
        paddingRight: '50px',
    },
    gridPaddingBottom: {
        paddingBottom: '50px',
    },
    integerScale: {
        display: 'flex',
        flexWrap: 'no-wrap',
        alignItems: 'center',
    },
    integerScaleChild: {
        flex: '0 0 auto',
    },
    elementContainer: {
        marginTop: '60px',
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    doSurveyButton: {
        marginLeft: '10px',
    },
});

/**
 * Setup state to initial (as defined by API) for each question. Mapped as [question_index: number]: [radio_value: number].
 */
export function setupInitialState(model) {
    const initialResponse = model.question_group_type_data.initial;
    const initialState = {};
    model.questions.forEach((question, i) => {
        initialState[i] = initialResponse;
        question.response = initialResponse;
    });
    return initialState;
}

