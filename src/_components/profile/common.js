/* THIRD PARTY IMPORTS */
import { makeStyles } from '@material-ui/core';

// Survey styles.
export const useStyles = makeStyles({
    rowFlexContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    seeMoreLink: {
        padding: '16px',
    },
    noDataMessage: {
        marginTop: '20px',
    },
});