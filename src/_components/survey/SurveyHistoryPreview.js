/* REACT IMPORTS */
import React from "react";
/* THIRD PARTY IMPORTS */
import { 
    makeStyles,
    Card,
    CardActions,
    CardContent,
    Button,
    Typography,
 } from "@material-ui/core";
import { Link } from 'react-router-dom';
import { CardHeader } from "@material-ui/core";

const surveyHistoryPColumns = [
    {
        id: 'name',
        label: 'Name',
    },
]

export function historyPreview() {
    const surveyHistoryP = this.props;

    return (
        <Card>
            <CardHeader
                title="Survey History Preview"
                titleTypographyProps={{
                    component: "h1",
                    variant: "h4",
                }} />
            <CardContent>
                surveyHistoryP?.slice(0,3).map((survey, i) =>(
                <Typography variant="h6" align="left" key={i}>
                    {survey.name}
                </Typography>
                )
            </CardContent>
            <CardActions>
                <Button size="small" variant="outlined" color="primary">
                    <Link to="/program/survey">See More</Link>
                </Button>
            </CardActions>
        </Card>
    );
}
