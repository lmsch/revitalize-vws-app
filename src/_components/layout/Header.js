/* REACT IMPORTS */
import React, { useEffect } from "react";
import { useHistory, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
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
import { userActions, profileActions } from '../../_actions';

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
        background: 'none !important',
        border: 'none',
        padding: '0 !important',
        color: 'white',
        textDecoration: 'underline',
        cursor: 'pointer',
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

function ImageAvatars(props) {
    const [open, setOpen] = React.useState(false);
    const { classes, payload, loggedIn, dispatch } = props;

    if (loggedIn && payload?.length > 0) {
        const profile = payload[0];
        return (
            <React.Fragment>
                <span>
                    {`${profile.first_name} ${profile.last_name} `}
                    <button 
                        className={classes.signOutLink} 
                        onClick={_ => dispatch(userActions.logout(true))}>
                        (Sign Out)
                    </button>
                </span>
                <Avatar 
                    className={classes.selectAvatar} 
                    alt={`${profile.first_name} ${profile.last_name}`} 
                    src={profile.profile_picture} />
            </React.Fragment>
        );
    }
    else if (!loggedIn) {
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
                    handleSubmit={_ => setOpen(false)}
                    handleClose={_ => setOpen(false)} />
            </div>
        );
    } else {
        return (
            <button 
                className={classes.signOutLink} 
                onClick={_ => dispatch(userActions.logout(true))}>
                (Sign Out)
            </button>
        );
    }
}

function Header(props) {
    const classes = useStyles();
    const location = useLocation();
    const history = useHistory();
    const dispatch = props.dispatch;

    const { loggedIn } = props.authentication;
    const { payload, loadingProfile, profileLoaded } = props.profile;

    const currentPath = mainLinks.find(link => link.link === location.pathname);

    useEffect(() => {
        if(loggedIn && !loadingProfile && !profileLoaded) {
            dispatch(profileActions.getProfile());
        }
    });

    const imageAvatarProps = { classes, loggedIn, payload, dispatch };

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
                        classes={{ indicator: !currentPath ? classes.inProgramTabs : '' }}
                        variant="fullWidth"
                        aria-label="nav tabs"
                        value={currentPath ? currentPath.value : false }
                    >
                        {mainLinks.map(link =>
                        <Tab
                            key={link.id}
                            label={link.label}
                            component="a"
                            onClick={_ =>  history.push(link.link)} />                   )}
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
                    <ImageAvatars {...imageAvatarProps} />
                </div>
            </AppBar>
        </div>
    );
}

function mapStateToProps(state) {
    const { authentication, profile } = state;
    return {
        authentication,
        profile,
    };
}

const connectedHeader = connect(mapStateToProps)(Header);
export { connectedHeader as Header };