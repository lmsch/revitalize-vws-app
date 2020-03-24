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
 } from "@material-ui/core";
import { Link } from 'react-router-dom';
import * as moment from 'moment';

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
    return (
        <Card>
            <CardHeader 
                title="Recently Completed Surveys"
                titleTypographyProps={{
                    component: "h1",
                    variant: "h4",
                }} />
            <Link to="/program/surveys">See More</Link>
            <CardContent>
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
                    {surveyHistory?.slice(0, 3).map((survey, i)  => (
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
            </CardContent>
        </Card>
    );
}
