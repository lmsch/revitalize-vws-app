/* REACT IMPORTS */
import React from "react";
import PropTypes from 'prop-types';
/* THIRD PARTY IMPORTS */
import {
  makeStyles,
  Table,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Button,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
/* LOCAL IMPORTS */
import { styles } from './common';

const surveyHistoryColumns = [
  {
    id: 'name',
    label: 'Name',
  },
];

// const rows = [createData("Survey History 1")];

class SurveyHistory extends React.Component {
  state = {
    selectedSurvey: null,
  }

  handleSelect = (survey) => {
    this.setState({ selectedSurvey: survey });
  };

  viewSurvey = () => {
    if (this.state.selectedSurvey) {
      this.props.onSurveySelected(this.state.selectedSurvey.id);
    }
  };

  render() {
    const { classes, surveyHistory } = this.props;

    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableCell>
              <b>
                Recent Surveys
              </b>
            </TableCell>
            <TableRow>
              {surveyHistoryColumns.map(column => (
                <TableCell
                  key={column.id}
                  align="left">
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {surveyHistoryColumns.map(survey => (
              <TableRow
                hover
                classes={{
                  // hover: classes.surveyHistoryRow,
                }}
                key={survey.id}>
                <TableCell
                  align="left">
                  {survey.name}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell
                colSpan={2}>
                <div className={`${classes.doSurveyContainer} ${classes.rowFlexContainer}`}>
                  <span>
                    {this.state.selectedSurvey ?
                      `You have selected ${this.state.selectedSurvey.name}.`
                      : 'Click on a row to select a survey.'
                    }
                  </span>
                  <Button
                    className={classes.viewSurveyButton}
                    variant="contained"
                    color="primary"
                    onClick={_ => this.viewSurvey()}>
                    View Survey
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}
SurveyHistory.propTypes = {
  surveyHistory: PropTypes.array.isRequired,
  onSurveySelected: PropTypes.func.isRequired,
};
const styledSurveyHistory = withStyles(styles)(SurveyHistory);
export { styledSurveyHistory as SurveyHistory };