/* REACT IMPORTS */
import React from "react";
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
/* THIRD PARTY IMPORTS */
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import LanguageIcon from "@material-ui/icons/Language";
import { Select, MenuItem, IconButton, makeStyles, Avatar } from '@material-ui/core';
/* LOCAL IMPORTS */
import { SideDrawer } from "./Drawer";
import { LoginPage } from '../../LoginPage';
import { userActions } from '../../_actions';

const useStyles = makeStyles(theme => ({
    appBar: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '0 30px 0 18px',
        width: '100%',
    },
    selectContainer: {
        display: 'flex',
        alignItems: 'center',
        flex: '0 0 auto',
    },
    selectChild: {
        margin: '0 30px 0 5px',
        color: 'white',
    },
    selectAvatar: {
        marginLeft: '10px',
    },
    tabsContainer: {
        display: 'flex',
        alignItems: 'center',
        flex: '0 0 auto',
    },
    tabs: {
        margin: '0 60px 0 60px',
    },
    menuButton: {
        marginRight: '18px',
    },
    inProgramTabs: {
        visibility: 'hidden',
    },
    notLoggedInMenu: {
        visibility: 'hidden',
    },
    signOutLink: {
        color: 'white',
    },
}));

const mainLinks = [
    {
        id: 'about-us',
        label: 'About Us',
        link: '/',
        value: 0,
    },
    {
        id: 'support',
        label: 'Support',
        link: '/support',
        value: 1,
    },
    {
        id: 'contact',
        label: 'Contact Us',
        link: '/contact',
        value: 2,
    },
];

function LinkTab(props) {
    const history = useHistory();
    return (
        <Tab
            component="a"
            onClick={event => {
                event.preventDefault();
                history.push(props.href);
            }}
            {...props}
        />
    );
}

function ImageAvatars(props) {
    const [open, setOpen] = React.useState(false);
    const profilePayload = useSelector(state => state.profile.payload);
    const dispatch = useDispatch();
    const { classes } = props;

    const handleClose = () => {
        setOpen(false);
    }

    const handleSubmit = () => {
        setOpen(false);
    }

    if (props.loggedIn && profilePayload?.length > 0) {
        const profile = profilePayload[0];
        return (
            <React.Fragment>
                <span>
                    {`${profile.first_name} ${profile.last_name} `}
                    <a 
                        className={classes.signOutLink} 
                        href="#"
                        onClick={_ => dispatch(userActions.logout(true))}>
                        (Sign Out)
                    </a>
                </span>
                <Avatar 
                    className={classes.selectAvatar} 
                    alt={`${profile.first_name} ${profile.last_name}`} 
                    src={profile.profile_picture} />
            </React.Fragment>
        );
    }
    else if (!props.loggedIn) {
        return (
            <div>
                <Button
                    aria-modal="true"
                    aria-label="Open sign in"
                    variant="contained"
                    onClick={_ => setOpen(true)}>
                    Sign In
                </Button>
                <LoginPage 
                    open={open}
                    handleSubmit={handleSubmit}
                    handleClose={handleClose} />
            </div>
        );
    } else {
        return (
            <a 
                className={classes.signOutLink} 
                href="#"
                onClick={_ => dispatch(userActions.logout(true))}>
                (Sign Out)
            </a>
        );
    }
}


export function Header() {
    const classes = useStyles();
    const loggedIn = useSelector(state => state.authentication.loggedIn);
    const location = useLocation();
    const currentPath = mainLinks.find((link) => link.link === location.pathname);
    let inProgram = true;
    if(currentPath) {
        inProgram = false;
    }
    return (
        <div>
            <AppBar
                position="relative"
                className={classes.appBar}>
                <div className={classes.tabsContainer}>
                    <IconButton
                        className={`${!loggedIn ? classes.notLoggedInMenu : ''} ${classes.menuButton}`}
                        disabled={!loggedIn}
                        color="inherit"
                        aria-label="open drawer">
                        <SideDrawer />
                    </IconButton>
                    <Typography
                        component="h1"
                        variant="h6">
                        REVITALIZE
                    </Typography>
                    <Tabs
                        className={classes.tabs}
                        classes={{ indicator: inProgram ? classes.inProgramTabs : '' }}
                        variant="fullWidth"
                        aria-label="nav tabs"
                        value={currentPath ? currentPath.value : false }
                    >
                    {mainLinks.map(link =>
                        <LinkTab 
                            key={link.id} 
                            label={link.label}
                            href={link.link} />
                    )}
                    </Tabs>
                </div>
                <div className={classes.selectContainer}>
                    <LanguageIcon />
                    <Select
                        id="Language selector"
                        value="EN"
                        className={classes.selectChild}
                    >
                        <MenuItem value="EN">EN</MenuItem>
                        <MenuItem value="FR">FR</MenuItem>
                    </Select>
                    <ImageAvatars 
                        loggedIn={loggedIn} 
                        classes={classes} />
                </div>
            </AppBar>
        </div>
    );
}