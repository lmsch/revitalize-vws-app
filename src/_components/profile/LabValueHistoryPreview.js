/* REACT IMPORTS */
import React from "react";
import { Link } from 'react-router-dom';
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
    Typography,
} from "@material-ui/core";
import * as moment from 'moment';
/* LOCAL IMPORTS */
import { useStyles } from './common';
import { handleDateSort } from '../../_helpers';

const labValueHistoryPreviewColumns = [
    {
        id: 'name',
        label: 'Name',
    },
    {
        id: 'value',
        label: 'Value',
    },
    {
        id: 'submission_date',
        label: 'Submission Date',
    },
]

export function LabValueHistoryPreview(props) {
    const { labValueHistory } = props;
    const classes = useStyles();
    return (
        <Card>
            <div className={classes.rowFlexContainer}>
                <CardHeader 
                    title="Summary of Lab Values"
                    titleTypographyProps={{
                        component: "h1",
                        variant: "h4",
                    }} />
                <Link 
                    className={classes.seeMoreLink} 
                    to="/program/lab-values">
                    See More
                    </Link>
            </div>
            <CardContent>
                <Typography 
                    component="h2" 
                    variant="h6">
                    Current Physical Measurements
                </Typography>
                <Typography 
                    component="h2" 
                    variant="h6">
                    Recent Lab Values
                </Typography>
                { !labValueHistory || labValueHistory.length <= 0 ?
                <div className={classes.noDataMessage}><b>No data to display.</b></div>
                :
                <Table>
                    <TableHead>
                        <TableRow>
                        {labValueHistoryPreviewColumns.map(column => (
                            <TableCell
                                key={column.id}
                                align="left">
                                {column.label}
                            </TableCell>
                        ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {handleDateSort(labValueHistory, 'asc').slice(0, 3).map((lvalue, i)  => (
                        <TableRow
                            key={i}>
                            <TableCell
                                align="left">
                                {lvalue.name}
                            </TableCell>
                            <TableCell
                                align="left">
                                {lvalue.value}
                            </TableCell>
                            <TableCell
                                align="left">
                                {moment.utc(lvalue.time).local().format('LLL')}
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
