/* REACT IMPORTS */
import React from "react";
import { useHistory } from 'react-router-dom';
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
    }
}));

function LinkTab(props) {
    return (
        <Tab
            component="a"
            onClick={event => {
                event.preventDefault();
                props.history.push(props.href);
            }}
            {...props}
        />
    );
}

function ImageAvatars(props) {
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    }

    const handleSubmit = (success) => {
        if(success) {
            setOpen(false);
        }
    }

    if (props.loggedIn) {
        return (
            <div>
                <Avatar alt="Revi Talize" src="/imgLocation" />
            </div>
        );
    }
    else {
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
    }
}


export function Header(props) {
    const classes = useStyles();
    const history = useHistory();
    const [value, setValue] = React.useState(0);

    const handleChange = (_, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <AppBar
                position="relative"
                className={classes.appBar}>
                <div className={classes.tabsContainer}>
                    <IconButton
                        className={`${!props.loggedIn ? classes.notLoggedInMenu : ''} ${classes.menuButton}`}
                        disabled={!props.loggedIn}
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
                        classes={{ indicator: props.inProgram ? classes.inProgramTabs : '' }}
                        variant="fullWidth"
                        aria-label="nav tabs"
                        value={value}
                        onChange={handleChange}
                    >
                        <LinkTab label="About Us" href="/" history={history} />
                        <LinkTab label="Support" href="/support" history={history} />
                        <LinkTab label="Contact" href="/contact" history={history} />
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
                    <ImageAvatars loggedIn={props.loggedIn} />
                </div>
            </AppBar>
        </div>
    );
}