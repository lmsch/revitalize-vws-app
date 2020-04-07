/**
 * NOTIFY DISPLAY: A reusable component for showing error messages or notifications.
 * Will only display if contains a list of messages; otherwise it returns null.
 * Props:
 *  header: Set title manually. string
 *  items: A list of items to display or a single string (displayed as a title). string[] | string
 *  itemsRef: A node reference to control the component (perhaps to scroll it into view). RefObject
 *  icon: Whether to display an error icon or not. boolean
 */
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
    itemCardHeader: {
        padding: '0 10px 0 10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start',
    },
});

class NotifyDisplay extends React.Component{

    /**
     * If header is provided, sets the title to header. Otherwise if items is a single string,
     * the title becomes a string. Otherwise uses default.
     * @param {*} items - A list of items.
     * @param {*} header - A header.
     */
    determineTitle(items, header) {
        if(header) {
            return header;
        } else if(_.isString(items)) {
            return items;
        } else {
            return 'See errors below:';
        }
    }

    render(){
        const props = this.props;
        const { classes } = props;
        if(!props.items) {
            return null;
        }
        return (
            <Card 
                className={classes.root}
                ref={props.itemsRef}>
                <div className={classes.itemCardHeader}>
                    {props.icon ?
                    <Icon 
                        fontSize="large" 
                        color="error">
                        error_outline
                    </Icon> : null
                    }
                    <CardHeader 
                        title={this.determineTitle(props.items, props.header)}
                        titleTypographyProps={{
                            component: "h6",
                            variant: "h6",
                        }} />
                </div>
                {_.isArray(props.items) && props.items.length > 0 ?
                    <CardContent>
                        <ul>
                        {props.items.map((item, i) =><li key={i}>{item}</li>)}
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
