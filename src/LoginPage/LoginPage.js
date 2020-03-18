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
} from '@material-ui/core';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { withStyles } from "@material-ui/core/styles";
/* LOCAL IMPORTS */
import { ErrorDisplay } from '../_components';
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
        this.props.dispatch(userActions.login(values.username, values.password, this.props.handleSubmit));
    }

    render() {
        const { classes, open, handleClose, authentication: { loggedIn, error }} = this.props;
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
                            <ErrorDisplay errors={!loggedIn && error ? "Your username or password was incorrect." : ''} />
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
    handleSubmit: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
    const { authentication } = state;
    return {
        authentication,
    };
}

const styledLoginPage = withStyles(styles)(LoginPage);
const connectedStyledLoginPage = connect(mapStateToProps)(styledLoginPage);
export { connectedStyledLoginPage as LoginPage };
