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
} from "@material-ui/core";
import * as moment from 'moment';

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
    return (
        <Card>
            <CardHeader 
                title="Recently Submitted Lab Values"
                titleTypographyProps={{
                    component: "h1",
                    variant: "h4",
                }} />
            <Link to="/program/lab-values">See More</Link>
            <CardContent>
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
                    {labValueHistory?.slice(0, 3).map((lvalue, i)  => (
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
            </CardContent>
        </Card>
    );
}
