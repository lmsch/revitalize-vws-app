/* REACT IMPORTS */
import React from 'react';
import { connect } from 'react-redux';
/* THIRD PARTY IMPORTS */
import { 
    Typography,
    Avatar,
    withStyles,
} from '@material-ui/core';
/* LOCAL IMPORTS */
import { MyInformation } from '../_components';

const styles = () => ({
    largeAvatar: {
        fontSize: '100px',
        height: '200px',
        width: '200px',
    },
    avatarContainer: {
        flex: '0 0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginRight: '40px',
    },
    welcomeTitle: {
        marginBottom: '10px',
    },
    myInformationContainer: {
        display: 'flex',
        alignItems: 'flex-start',
    },
    myInformation: {
        flex: '1 1 auto',
    }
});

class MyProfilePage extends React.Component {
    
    render() {
        let { profile, classes } = this.props;
        profile = profile.payload && profile.payload.length > 0 ? profile.payload[0] : {};
        return (
            <div className={classes.myInformationContainer}>
                <div className={classes.avatarContainer}>
                    <Typography
                        className={classes.welcomeTitle}
                        component="h1"
                        variant="h6">
                        {`Welcome, ${profile.first_name}!`} 
                    </Typography>
                    <Avatar 
                        className={classes.largeAvatar}
                        alt={`${profile.first_name} ${profile.last_name}`} 
                        src={profile.profile_picture} />
                </div>
                <div className={classes.myInformation}>
                    <MyInformation profile={profile} />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { profile } = state;
    return {
        profile,
    };
}

const connectedMyProfilePage = connect(mapStateToProps)(MyProfilePage)
const styledConnectedMyProfilePage = withStyles(styles)(connectedMyProfilePage)
export { styledConnectedMyProfilePage as MyProfilePage };
