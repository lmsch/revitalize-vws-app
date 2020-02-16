/* REACT IMPORTS */
import React from 'react'
/* THIRD PARTY IMPORTS */
import {AppBar, withStyles} from "@material-ui/core";

const styles = () => ({
    footer: {
        textAlign: 'center',
        paddingTop: '20px',
        paddingBottom: '20px',
    },
});

class Footer extends React.Component{
    render(){
        const { classes } = this.props;
        return (
            <footer>
                <AppBar>
                    <div className={classes.footer}>
                        <p>&copy; 2020 ---</p>
                    </div>
                </AppBar>
            </footer>
        );
    }
}

const styledFooter = withStyles(styles)(Footer);
export { styledFooter as Footer };
