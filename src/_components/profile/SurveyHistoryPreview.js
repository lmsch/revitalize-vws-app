/* REACT IMPORTS */
import React from "react";
/* THIRD PARTY IMPORTS */
import { 
    Card,
    CardContent,
    CardHeader,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Typography,
 } from "@material-ui/core";
import { Link } from 'react-router-dom';
import * as moment from 'moment';
/* LOCAL IMPORTS */
import { useStyles } from './common';
import { handleDateSort } from '../../_helpers';

const surveyHistoryPreviewColumns = [
    {
        id: 'name',
        label: 'Name',
    },
    {
        id: 'submission_date',
        label: 'Submission Date',
    },
]

export function SurveyHistoryPreview(props) {
    const { surveyHistory } = props;
    const classes = useStyles();
    return (
        <Card>
            <div className={classes.linkContainer}>
                <CardHeader 
                    title="Summary of Surveys"
                    titleTypographyProps={{
                        component: "h1",
                        variant: "h4",
                    }} />
                <Link 
                    className={classes.seeMoreLink} 
                    to="/program/surveys">
                    See More
                    </Link>
            </div>
            <CardContent>
                <Typography 
                    component="h2" 
                    variant="h6">
                    Recent Surveys
                </Typography>
                { !surveyHistory || surveyHistory.length <= 0 ?
                <div className={classes.noDataMessage}><b>No data to display.</b></div>
                :
                <Table>
                    <TableHead>
                        <TableRow>
                        {surveyHistoryPreviewColumns.map(column => (
                            <TableCell
                                key={column.id}
                                align="left">
                                {column.label}
                            </TableCell>
                        ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {handleDateSort(surveyHistory, 'asc').slice(0, 3).map((survey, i)  => (
                        <TableRow
                            key={i}>
                            <TableCell
                                align="left">
                                {survey.name}
                            </TableCell>
                            <TableCell
                                align="left">
                                {moment.utc(survey.time).local().format('LLL')}
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
                }
            </CardContent>
        </Card>
    );
}
