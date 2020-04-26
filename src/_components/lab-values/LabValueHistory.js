/**
 * LAB VALUE HISTORY: A component for displaying the name, value, unit, and submission date of all lab values submitted
 * for a user. Displayed on LabValuesPage. Uses MATERIAL-UI table and paginator.
 * Props:
 *  labValueHistory: The history of all lab values for a user. {name: string, value: string, unit: string, time: string}[]
 */

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
    TableSortLabel,
    TablePagination,
} from "@material-ui/core";
import * as moment from 'moment';
/* LOCAL IMPORTS */
import { handleDateSort } from '../../_helpers';

// Columns of history table. TODO: Add unit.
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
        id: 'unit',
        label: 'Unit',
    },
    {
        id: 'submission_date',
        label: 'Submission Date',
    },
];

class LabValueHistory extends React.Component{
    
    // State contains the current page of history data, the number of rows to display per page, and the sort order.
    state = {
        page: 0,
        rowsPerPage: 5,
        dateOrder: 'desc',
    }

    handleChangePage = (_, newPage) => {
        this.setState({page: newPage});
    };
    
    handleChangeRowsPerPage = event => {
        this.setState({page: 0, rowsPerPage: parseInt(event.target.value, 10)});
    };

    handleDateSortUpdate = () => {
        const { dateOrder } = this.state;
        this.setState({dateOrder: dateOrder === 'asc' ? 'desc' : 'asc'});
    }

    render() {
        const { labValueHistory } = this.props;
        const { page, rowsPerPage, dateOrder } = this.state;
        let sortedLabValueHistory = handleDateSort(labValueHistory, dateOrder);
        // Computes section of history to display.
        if(rowsPerPage > 0) {
            sortedLabValueHistory = sortedLabValueHistory.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
        } 
        // Shows any remaining room in the table as empty rows.
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, labValueHistory.length - page * rowsPerPage);
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
                                    { column.id === 'submission_date' ?
                                    <TableSortLabel
                                        active={true}
                                        direction={dateOrder}
                                        onClick={_ => this.handleDateSortUpdate()}>
                                        {column.label}
                                    </TableSortLabel>: <span>{column.label}</span>
                                    }
                                </TableCell>
                            ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {sortedLabValueHistory.map((lvalue, i)  => (
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
                        {emptyRows > 0 && 
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={2} />
                            </TableRow>
                        }
                        </TableBody>
                    </Table>
                    <TablePagination
                        component="div"
                        rowsPerPageOptions={[5, 10, 25]}
                        count={labValueHistory?.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}/>
                </CardContent>
            </Card>
        );
    }
}

LabValueHistory.propTypes = {
    labValueHistory: PropTypes.array.isRequired,
};

export { LabValueHistory };
