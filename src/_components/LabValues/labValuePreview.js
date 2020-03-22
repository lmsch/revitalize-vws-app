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

const labValueHistoryPColumns = [
    {
        id: 'name',
        label: 'Name',
    },
]

export function historyPreview() {
    const labValueHistoryP = this.props;

    return (
        <Card>
            <CardHeader
                title="Lab Value History Preview"
                titleTypographyProps={{
                    component: "h1",
                    variant: "h4",
                }} />
            <CardContent>
                labValueHistoryP?.slice(0,3).map((lvalue, i) =>(
                <Typography variant="h6" align="left" key={i}>
                    {lvalue.name}
                </Typography>
                )
            </CardContent>
            <CardActions>
                <Button size="small" variant="outlined" color="primary">
                    <Link to="/program/LabValue">See More</Link>
                </Button>
            </CardActions>
        </Card>
    );
}
