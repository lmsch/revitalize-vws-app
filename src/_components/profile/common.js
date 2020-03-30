/* THIRD PARTY IMPORTS */
import { makeStyles } from '@material-ui/core';

// Survey styles.
export const useStyles = makeStyles({
    linkContainer: {
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
    physicalMeasurementContainer: {
        display: 'flex',
        justifyContent: 'start',
        flexWrap: 'wrap',
    },
    physicalMeasurementChild: {
        padding: '6px',
        margin: '10px',
        border: '1px solid',
        borderRadius: '4px'
    }

});