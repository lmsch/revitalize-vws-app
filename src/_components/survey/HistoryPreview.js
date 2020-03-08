import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {Link} from 'react-router-dom';
import { CardHeader } from "@material-ui/core";


export function historyPreview() {
    const classes = this.props;

    return (
        <Card>
            <CardHeader
                title ="Survey History Preview"
            titleTypographyProps={{
                component: "h1",
                variant: "h4",
            }}/>
            <CardContent>
                <Typography variant="h6" component="h2">
                    Insert last used survey
        </Typography>
                <Typography variant="h6" component="h2">
                    insert 2nd to last survey
        </Typography>
                <Typography variant="h6" component="h2">
                    insert 3nd to last survey
        </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" variant="outlined" color="primary" /*Link="/program/survey"*/>
                    <Link to="//program/survey">See More</Link>
                </Button>
            </CardActions>
        </Card>
    );
}
