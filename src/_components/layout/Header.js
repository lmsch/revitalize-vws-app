/* REACT IMPORTS */
import React from "react";
import PropTypes from "prop-types";
/* THIRD PARTY IMPORTS */
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import LanguageIcon from "@material-ui/icons/Language";
import { Select, MenuItem, IconButton} from '@material-ui/core';
/* LOCAL IMPORTS */
import { history } from '../../_helpers';
import { SideDrawer } from "./Drawer";


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`nav-tabpanel-${index}`}
            aria-labelledby={`nav-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

function a11yProps(index) {
    return {
        id: `nav-tab-${index}`,
        "aria-controls": `nav-tabpanel-${index}`
    };
}

function LinkTab(props) {
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

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    appBar: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
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
        margin: '0 18px 0 18px',
    },
}));

export function Header() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (_, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar 
                position="relative"
                className={classes.appBar}>
                <div className={classes.tabsContainer}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        className={classes.menuButton}>
                        <SideDrawer />
                    </IconButton>
                    <Typography 
                        className={classes.title}
                        component="h1" 
                        variant="h6">
                            REVITALIZE
                    </Typography>
                    <Tabs
                        className={classes.tabs}
                        variant="fullWidth"
                        value={value}
                        onChange={handleChange}
                        aria-label="nav tabs"
                    >
                        <LinkTab label="About Us" href="/" {...a11yProps(0)} />
                        <LinkTab label="Support" href="/support" {...a11yProps(1)} />
                        <LinkTab label="Contact" href="/contact" {...a11yProps(2)} />
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
                </div>
            </AppBar>
        </div>
    );
}