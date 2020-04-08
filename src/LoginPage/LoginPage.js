/**
 * LOGIN PAGE: Login dialog page. Uses REDUX FORM to display MATERIAL UI text fields.
 * Props:
 *  open: Whether the dialog is open or not. boolean.
 *  onLoginAttempt: Function that is called on an attempted login. Emits 'Success' is login is sucessful; otherwise,  and error message.
 *  handleClose: If user attempts to close dialog, function is called.
 */

/* REACT IMPORTS */
import React from 'react';
import { PropTypes } from 'prop-types';
/* THIRD PARTY IMPORTS */
import {
    Container,
    Typography,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    withStyles,
} from '@material-ui/core';
import { reduxForm, Field } from 'redux-form';
import { withSnackbar } from 'notistack';
import { connect } from 'react-redux';
/* LOCAL IMPORTS */
import { userActions } from '../_actions';
import { renderTextField, requiredVal } from '../_helpers';

const styles = () => ({
    loginContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    submit: {
        marginTop:'28px',
    },

});

let LoginForm = props => (
    <form onSubmit={props.handleSubmit}>
        <Field
            component={renderTextField}
            name="username"
            label="Username"
            validate={requiredVal}
            variant="outlined"
            margin="normal"
            fullWidth
            autoFocus />
        <Field
            component={renderTextField}
            name="password"
            label="Password"
            type="password"
            validate={requiredVal}
            variant="outlined"
            margin="normal"
            fullWidth />
        <Button
            className={props.classes.submit}
            type="submit"
            variant="contained"
            color="primary"
            fullWidth>
            Sign In
        </Button>
    </form>
);

LoginForm = reduxForm({
    form: 'loginForm',
})(LoginForm);

class LoginPage extends React.Component {

    handleSubmit = values => {
        this.props.dispatch(userActions.login(values.username, values.password, this.onLoginAttempt));
    }

    // If failed login attempt, create a snackbar showing error message.
    onLoginAttempt = result => {
        if(result === 'Unauthorized') {
            this.props.enqueueSnackbar('Your username or password was incorrect.', {
                variant: 'error',
                action: key => <Button style={{color: 'white'}} onClick={() => this.props.closeSnackbar(key)}>Dismiss</Button>,
            });
        }
        this.props.onLoginAttempt(result);
    }

    render() {
        const { classes, open, handleClose } = this.props;
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
                <DialogContent dividers>
                    <Container maxWidth="xs">
                        <div className={classes.loginContainer}>
                            <LoginForm 
                                classes={classes}
                                onSubmit={this.handleSubmit} />
                        </div>
                    </Container>
                </DialogContent>
            </Dialog>
        );
    }
}

LoginPage.propTypes = {
    open: PropTypes.bool.isRequired,
    onLoginAttempt: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
}


const styledLoginPage = withStyles(styles)(LoginPage);
const snackedStyledLoginPage = withSnackbar(styledLoginPage);
const connectedSnackedStyledLoginPage = connect(null)(snackedStyledLoginPage);
export { connectedSnackedStyledLoginPage as LoginPage };
