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

    handleDateSort(labValueHistory) {
        const { dateOrder } = this.state;
        if(labValueHistory) {   
            labValueHistory = labValueHistory.slice().sort((h1, h2) => {
                return moment.utc(h1.time).diff(moment.utc(h2.time));
            });
            if(dateOrder === 'desc') {
                labValueHistory.reverse();
            }
            return labValueHistory;
        } else {
            return [];
        }
    }

    render() {
        const { labValueHistory } = this.props;
        const { page, rowsPerPage, dateOrder } = this.state;
        let soredLabValueHistory = this.handleDateSort(labValueHistory);
        if(rowsPerPage > 0) {
            soredLabValueHistory = soredLabValueHistory.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
        } 
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
                        {soredLabValueHistory.map((lvalue, i)  => (
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
