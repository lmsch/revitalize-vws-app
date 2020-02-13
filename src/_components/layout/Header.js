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
import { Select, MenuItem } from '@material-ui/core';

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
            }}
            {...props}
        />
    );
}

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: '100%',
    },
    selectContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    selectChild: {
        marginRight: '10px',
        marginLeft: '10px',
    },
}));

export function NavTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (_, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs
                    variant="fullWidth"
                    value={value}
                    onChange={handleChange}
                    aria-label="nav tabs"
                >
                    <LinkTab label="About Us" href="/about-us" {...a11yProps(0)} />
                    <LinkTab label="Support" href="/support" {...a11yProps(1)} />
                    <LinkTab label="Contact" href="/contact" {...a11yProps(2)} />
                    <div className={classes.selectContainer}>
                        <LanguageIcon />
                        <Select
                            autoWidth="true"
                            id="Language selector"
                            value="EN"
                            className={classes.selectChild}
                        >
                            <MenuItem value="EN">EN</MenuItem>
                            <MenuItem value="FR">FR</MenuItem>
                        </Select>
                    </div>
                </Tabs>
            </AppBar>
        </div>
    );
}