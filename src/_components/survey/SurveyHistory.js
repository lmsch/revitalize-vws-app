/**
 * SURVEY HISTORY: A component for displaying the name and submission date of all surveys submitted
 * for a user. Displayed on SurveysPAge. Uses MATERIAL-UI table and paginator.
 * Props:
 *  surveyHistory: The history of all surveys for a user. {name: string, time: string}[]
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
    TablePagination,
    TableSortLabel,
} from "@material-ui/core";
import * as moment from 'moment';
/* LOCAL IMPORTS */
import { handleDateSort } from '../../_helpers';

// Columns of history table.
const surveyHistoryColumns = [
    {
        id: 'name',
        label: 'Name',
    },
    {
        id: 'submission_date',
        label: 'Submission Date',
    },
];

class SurveyHistory extends React.Component {

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
        const { surveyHistory } = this.props;
        const { page, rowsPerPage, dateOrder } = this.state;
        let sortedSurveyHistory = handleDateSort(surveyHistory, dateOrder);
        // Computes section of history to display.
        if(rowsPerPage > 0) {
            sortedSurveyHistory = sortedSurveyHistory.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
        } 
        // Shows any remaining room in the table as empty rows.
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, surveyHistory.length - page * rowsPerPage);
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
                        {sortedSurveyHistory.map((survey, i)  => (
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
                        count={surveyHistory?.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}/>
                </CardContent>
            </Card>
        );
    }
}

SurveyHistory.propTypes = {
    surveyHistory: PropTypes.array.isRequired,
};
export { SurveyHistory };