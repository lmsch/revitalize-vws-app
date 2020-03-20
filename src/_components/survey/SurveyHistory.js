/* REACT IMPORTS */
import React from "react";
import PropTypes from 'prop-types';
/* THIRD PARTY IMPORTS */
import {
    Table,
    TableRow,
    TableHead,
    TableCell,
    TableBody,
    Card,
    CardHeader,
    CardContent,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Moment from 'react-moment';
/* LOCAL IMPORTS */
import { styles } from './common';

const surveyHistoryColumns = [
    {
        id: 'name',
        label: 'Name',
    },
    {
        id: 'submission_date',
        label: 'Submission Date',
    },
    {
        id: 'score',
        label: 'Score'
    },
];

class SurveyHistory extends React.Component {

    render() {
        const { surveyHistory } = this.props;
        return (
            <Card>
                <CardHeader 
                    title="Survey History"
                    titleTypographyProps={{
                        component: "h1",
                        variant: "h4",
                    }} />
                <CardContent>
                    <Table>
                        <TableHead>
                            <TableRow>
                            {surveyHistoryColumns.map(column => (
                                <TableCell
                                    key={column.id}
                                    align="left">
                                    {column.label}
                                </TableCell>
                            ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {surveyHistory?.map((survey, i)  => (
                            <TableRow
                                key={i}>
                                <TableCell
                                    align="left">
                                    {survey.name}
                                </TableCell>
                                <TableCell
                                    align="left">
                                    <Moment
                                        utc
                                        local
                                        format="LLL">
                                        {survey.time}
                                    </Moment>
                                </TableCell>
                                <TableCell
                                    align="left">
                                    {survey.score}
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        );
    }
}

SurveyHistory.propTypes = {
    surveyHistory: PropTypes.array.isRequired,
};

const styledSurveyHistory = withStyles(styles)(SurveyHistory);
export { styledSurveyHistory as SurveyHistory };