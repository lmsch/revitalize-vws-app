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
 import * as _ from 'lodash';

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

class NotifyDisplay extends React.Component{

    determineTitle(errors, header) {
        if(header) {
            return header;
        } else if(_.isString(errors)) {
            return errors;
        } else {
            return 'See errors below:';
        }
    }

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
                    {props.icon ?
                    <Icon 
                        fontSize="large" 
                        color="error">
                        error_outline
                    </Icon> : null
                    }
                    <CardHeader 
                        title={this.determineTitle(props.errors, props.header)}
                        titleTypographyProps={{
                            component: "h6",
                            variant: "h6",
                        }} />
                </div>
                {_.isArray(props.errors) && props.errors.length > 0 ?
                    <CardContent>
                        <ul>
                        {props.errors.map((error, i) =><li key={i}>{error}</li>)}
                        </ul>
                    </CardContent>
                    : null
                }
        </Card>
        );
    }
}

NotifyDisplay.defaultProps = {
    icon: true,
}

const styledNotifyDisplay = withStyles(styles)(NotifyDisplay);
export { styledNotifyDisplay as NotifyDisplay };
