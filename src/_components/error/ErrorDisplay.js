/* REACT IMPORTS */
import React from 'react'
/* THIRD PARTY IMPORTS */
import { 
    withStyles,
    Icon,
    Card,
    CardHeader,
    CardContent,
 } from "@material-ui/core";

const styles = () => ({
    root: {
        marginBottom: '20px',
    },
    errorCardHeader: {
        padding: '0 10px 0 10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start',
    },
});

class ErrorDisplay extends React.Component{

    render(){
        const props = this.props;
        const { classes } = props;
        if(!props.errors || props.errors.length <= 0) {
            return null;
        }
        return (
            <Card 
                className={classes.root}
                ref={props.errorsRef}>
                <div className={classes.errorCardHeader}>
                    <Icon 
                        fontSize="large" 
                        color="error">
                        error_outline
                    </Icon>
                    <CardHeader 
                        subheader={props.header ? props.header : 'See errors below.'}
                        titleTypographyProps={{
                            component: "h6",
                            variant: "h6",
                        }} />
                </div>
            <CardContent>
                <ul>
                {props.errors?.map((error, i) =><li key={i}>{error}</li>)}
                </ul>
            </CardContent>
        </Card>
        );
    }
}

const styledErrorDisplay = withStyles(styles)(ErrorDisplay);
export { styledErrorDisplay as ErrorDisplay };
