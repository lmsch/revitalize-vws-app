/* REACT IMPORTS */
import React from 'react'
/* THIRD PARTY IMPORTS */
import { withStyles, Box } from "@material-ui/core";

/* Styling for the footer */
const styles = (theme) => (
    {
        footer: {
            textAlign: 'center',
            paddingTop: '5px',
            paddingBottom: '5px',
            backgroundColor: theme.palette.primary.main,
            color: 'white',
        }
    }
);

class Footer extends React.Component{
    /* Footer of the page */
    render(){
        const { classes } = this.props;
        return (
            <footer>
                <Box 
                    boxShadow={3} 
                    className={classes.footer}>
                    <p>&copy; 2020 ---</p>
                </Box>
            </footer>
        );
    }
}

const styledFooter = withStyles(styles)(Footer);
export { styledFooter as Footer };
