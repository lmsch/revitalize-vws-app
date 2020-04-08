/**
 * AVAILABLE SURVEYS: A component for selecting a survey to complete. User clicks on a row from a 
 * MATERIAL UI table and clicks do survey. Selection is highlighted.
 * Props:
 *  availableSurveys: A list of available surveys. {name: string, description: string, id: number}[]
 */

/* REACT IMPORTS */
import React from 'react';
import PropTypes from 'prop-types';
/* THIRD PARTY IMPORTS */
import { 
    Card, 
    CardHeader, 
    CardContent,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button,
} from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
/* LOCAL IMPORTS */
import { styles } from './common';

// Columns to display in available surveys table.
const availableSurveyColumns = [
    {
        id: 'name',
        label: 'Name',
    },
    {
        id: 'description',
        label: 'Description',
    },
];

class AvailableSurveys extends React.Component {

    state = {
        selectedSurvey: null,
    }

    handleSelect = (survey) => {
        this.setState({ selectedSurvey: survey });
    };

    // Called when user selects to do survey. Executes if a survey is selected.
    handleDoSurvey = () => {
        if (this.state.selectedSurvey) {
            this.props.onSurveySelected(this.state.selectedSurvey.id);
        }
    };

    render() {
        const { classes, availableSurveys } = this.props;
        return (
            <Card>
                <CardHeader 
                    title="Available Surveys"
                    titleTypographyProps={{
                        component: "h1",
                        variant: "h4",
                    }} />
                <CardContent>
                    <Table>
                        <TableHead>
                            <TableRow>
                            {availableSurveyColumns.map(column => (
                                <TableCell
                                    key={column.id}
                                    align="left">
                                    {column.label}
                                </TableCell>
                            ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {availableSurveys?.map(survey => (
                            <TableRow
                                hover
                                classes={{
                                    'selected': classes.availableSurveysSelected,
                                    hover: classes.availableSurveysRow,
                                }}
                                key={survey.id}
                                selected={this.state.selectedSurvey === survey}
                                onClick={_ => this.handleSelect(survey)}>
                                <TableCell
                                    align="left">
                                    {survey.name}
                                </TableCell>
                                <TableCell
                                    align="left">
                                    {survey.description}
                                </TableCell>
                            </TableRow>
                            ))}
                            <TableRow> 
                                <TableCell 
                                    colSpan={2}>
                                    <div className={`${classes.doSurveyContainer} ${classes.rowFlexContainer}`}>
                                        <b>
                                            { this.state.selectedSurvey ? 
                                                `You have selected ${this.state.selectedSurvey.name}.`
                                                : 'Click on a row to select a survey.'
                                            }
                                        </b> 
                                        <Button 
                                            className={classes.doSurveyButton}
                                            variant="contained" 
                                            color="primary"
                                            onClick={_ => this.handleDoSurvey()}>
                                            Do Survey
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        );
    }
}

AvailableSurveys.propTypes = {
    availableSurveys: PropTypes.array.isRequired,
    onSurveySelected: PropTypes.func.isRequired,
};

const styledAvailableSurveys = withStyles(styles)(AvailableSurveys);
export { styledAvailableSurveys as AvailableSurveys };
