/**
 * DRAWER: This is the MATERIAL-UI drawer that appears on the left side of the app.
 * It appears when the user is logged in on desktop or when the app is in a small window.
 * Contains links to program if logged in and about, contact, and support if in mobile.
 */

/* REACT IMPORTS */
import React from 'react';
import { useHistory } from 'react-router-dom'
/* THIRD PARTY IMPORTS */
import MenuIcon from '@material-ui/icons/Menu';
import { 
    useMediaQuery,
    makeStyles,
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Icon,
    Divider,
    ListSubheader
} from '@material-ui/core';
import { connect } from 'react-redux';
/* LOCAL IMPORTS */
import { programLinks, mainLinks } from './common';

const useStyles = makeStyles({
    list: {
        width: 250,
        paddingTop: '60px',
    },
    fullList: {
        width: 'auto',
    },
});

function SideDrawer(props) {
    const isMobile = useMediaQuery('(max-width:992px)');
    const history = useHistory();
    const classes = useStyles();
    const { loggedIn } = props.authentication;
    const [state, setState] = React.useState({ left: false, });

    const toggleDrawer = (side, open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [side]: open });
    };

    const sideList = side => (
        /* Side list to show the options of pages */
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
        >
            <List>
                {isMobile ?
                // Display primary links if in mobile.
                <React.Fragment>
                    <ListSubheader>
                        REVITALIZE
                    </ListSubheader>
                    <Divider />
                    {mainLinks.map((link) => (
                    <ListItem 
                        button 
                        key={link.label}
                        onClick={_ => history.push(link.url)}>
                        <ListItemIcon>
                            <Icon>chevron_right</Icon>
                        </ListItemIcon>
                        <ListItemText primary={link.label} />
                    </ListItem>
                    ))} 
                    <Divider />
                </React.Fragment> : null
                }
                {loggedIn ?
                // Display program links if logged in.
                <React.Fragment>
                    <ListSubheader>
                        Your Program
                    </ListSubheader>
                    <Divider />
                    {programLinks.map((link) => (
                    <ListItem 
                        button 
                        key={link.label}
                        onClick={_ => history.push(link.url)}>
                        <ListItemIcon>
                            <Icon>{link.icon}</Icon>
                        </ListItemIcon>
                        <ListItemText primary={link.label} />
                    </ListItem>
                    ))}
                    <Divider />
                </React.Fragment> : null
                }
            </List>
        </div>
    );

    return (
        <div>
            <MenuIcon onClick={toggleDrawer('left', true)}> </MenuIcon>
            <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
                {sideList('left')}
            </Drawer>
        </div>
    );
}

function mapStateToProps(state) {
    const { authentication } = state;
    return {
        authentication,
    };
}

const connectedSideDrawer = connect(mapStateToProps)(SideDrawer);
export { connectedSideDrawer as SideDrawer};