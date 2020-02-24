// Survey styles.
export const styles = () => ({
    formControl: {
        display: 'block',
    },
    formControlLabel: {
        margin: 0,
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
    }
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

