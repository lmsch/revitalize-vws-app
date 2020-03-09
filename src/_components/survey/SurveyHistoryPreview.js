import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
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
                <Button size="small" variant="outlined" color="primary" /*Link="/program/survey"*/>
                    <Link to="/program/survey">See More</Link>
                </Button>
            </CardActions>
        </Card>
    );
}
