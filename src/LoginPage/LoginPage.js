/* REACT IMPORTS */
import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
/* THIRD PARTY IMPORTS */
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from "@material-ui/core/styles";
/* LOCAL IMPORTS */
import { userActions } from '../_actions';

const styles  = theme => ({
    layout: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.props.dispatch(userActions.logout());
        this.state = {
            username: '',
            password: '',
            submitted: false,
        };
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ submitted: true });
        const { username, password } = this.state;
        const { dispatch, handleSubmit } = this.props;
        if (username && password) {
            dispatch(userActions.login(username, password));
            handleSubmit();
        }
    }

    render() {
        const { classes, open, handleClose } = this.props;
        const { username, password } = this.state;
        return (
            <Dialog
                open={open} 
                onClose={handleClose}
                aria-label="Sign in">
                <DialogTitle disableTypography={true}>
                    <Typography component="h1" variant="h4">
                        Sign in
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Container maxWidth="xs">
                        <div className={classes.layout}>
                            <form className={classes.form} onSubmit={this.handleSubmit} noValidate>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    autoFocus
                                    name="username"
                                    label="Username"
                                    value={username} 
                                    onChange={this.handleChange}/>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    value={password} 
                                    onChange={this.handleChange}/>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}>
                                    Sign In
                                </Button>
                            </form>
                        </div>
                    </Container>
                </DialogContent>
            </Dialog>
        );
    }
}

LoginPage.propTypes = {
    open: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
}

const connectedLoginPage = connect(null)(LoginPage);
const styledConnectedLoginPage = withStyles(styles)(connectedLoginPage);
export { styledConnectedLoginPage as LoginPage };
