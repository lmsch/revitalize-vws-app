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

const labValueHistoryColumns = [
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
];

class LabValueHistory extends React.Component{
    render() {
        const { labValueHistory } = this.props;
        return (
            <Card>
                <CardHeader 
                    title="Lab Value History"
                    titleTypographyProps={{
                        component: "h1",
                        variant: "h4",
                    }} />
                <CardContent>
                    <Table>
                        <TableHead>
                            <TableRow>
                            {labValueHistoryColumns.map(column => (
                                <TableCell
                                    key={column.id}
                                    align="left">
                                    {column.label}
                                </TableCell>
                            ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {labValueHistory?.map((lvalue, i)  => (
                            <TableRow
                                key={i}>
                                <TableCell
                                    align="left">
                                    {lvalue.name}
                                </TableCell>
                                <TableCell
                                    align="left">
                                    <Moment
                                        format="LLL">
                                        {lvalue.time}
                                    </Moment>
                                </TableCell>
                                <TableCell
                                    align="left">
                                    {lvalue.value}
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

LabValueHistory.propTypes = {
    labValueHistory: PropTypes.array.isRequired,
};

const styledLabValueHistory = withStyles(styles)(LabValueHistory);
export { styledLabValueHistory as LabValueHistory };

