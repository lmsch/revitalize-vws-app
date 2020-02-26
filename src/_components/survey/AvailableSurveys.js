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
                        {availableSurveys.map(survey => (
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
                                    <div className={classes.doSurveyContainer}>
                                        <span>
                                            { this.state.selectedSurvey ? 
                                                `You have selected ${this.state.selectedSurvey.name}.`
                                                : 'Click on a row to select a survey.'
                                            }
                                        </span> 
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
