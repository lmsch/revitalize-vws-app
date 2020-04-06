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

const useStyles = makeStyles({
    list: {
        width: 250,
        paddingTop: '60px',
    },
    fullList: {
        width: 'auto',
    },
});

/* Links to each page */
const programLinks = [
    {
        label: 'My Profile',
        url: '/program/profile',
        icon: 'account_box'
    },
    {
        label: 'Lab Values',
        url: '/program/lab-values',
        icon: 'folder_shared',
    },
    {
        label: 'Surveys',
        url: '/program/surveys',
        icon: 'library_books',
    },
    {
        label: 'Dietary Journal',
        url: '/program/journal',
        icon: 'menu_book',
    },
    {
        label: 'Goal Progress',
        url: '/program/progress',
        icon: 'trending_up',
    }
];

export function SideDrawer() {
    const history = useHistory();
    const classes = useStyles();
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