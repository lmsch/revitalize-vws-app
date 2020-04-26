/**
 * LAB VALUE HISTORY PREVIEW: A preview of lab value history that displays on the user profile.
 * Shows Current Physical Measurements (height and weight) as well as last 4 submitted lab values.
 * Uses a MATERIAL UI table.
 * TODO: Add height and weight units.
 * Props:
 *  labValueHistory: The history of all lab values for a user. {name: string, value: string, unit: string, time: string}[]
 */

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

// Columns to display in lab value history table. TODO: Add units.
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
        id: 'unit',
        label: 'Unit',
    },
    {
        id: 'submission_date',
        label: 'Submission Date',
    },
]

export function LabValueHistoryPreview(props) {
    const { labValueHistory, height, weight } = props;
    const classes = useStyles();
    return (
        <Card>
            <div className={classes.linkContainer}>
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
                <div className={classes.physicalMeasurementContainer}>
                    <label className={classes.physicalMeasurementChild}><b>Height:</b> {height ? height + ' m' : 'N/A'}</label>
                    <label className={classes.physicalMeasurementChild}><b>Weight:</b> {weight ? weight + ' kg': 'N/A'}</label>
                </div>
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
                    {handleDateSort(labValueHistory, 'desc').slice(0, 4).map((lvalue, i)  => (
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
                                {lvalue.indicator_data.unit}
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
