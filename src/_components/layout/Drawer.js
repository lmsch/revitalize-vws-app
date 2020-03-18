/* REACT IMPORTS */
import React from 'react';
import { useHistory } from 'react-router-dom'
/* THIRD PARTY IMPORTS */
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuIcon from '@material-ui/icons/Menu';
import Icon from '@material-ui/core/Icon';
import Divider from '@material-ui/core/Divider';
import { useMediaQuery } from '@material-ui/core';
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
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
        >
            <List>
                {loggedIn ?
                <React.Fragment>
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
                {isMobile ?
                <React.Fragment>
                    {mainLinks.map((link) => (
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