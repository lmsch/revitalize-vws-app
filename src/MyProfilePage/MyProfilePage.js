/* REACT IMPORTS */
import React from 'react';
import { connect } from 'react-redux';
/* THIRD PARTY IMPORTS */
import { 
    Typography,
    Avatar,
    withStyles,
    CircularProgress,
} from '@material-ui/core';
/* LOCAL IMPORTS */
import { 
    MyInformation, 
    LabValueHistoryPreview, 
    SurveyHistoryPreview,
} from '../_components';
import { apiCall } from '../_helpers';

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
        margin: '0px 40px 40px 0',
    },
    welcomeTitle: {
        marginBottom: '10px',
    },
    myInformationContainer: {
        display: 'flex',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
    },
    myInformation: {
        flex: '1 1 auto',
    }
});

class MyProfilePage extends React.Component {

    state = {
        labValueHistory: null,
        surveyHistory: null,
        height: null,
        weight: null,
    };

    componentDidMount() {
        apiCall('/lab-values/user/', { method: 'GET' })
            .then(response => this.setState({labValueHistory: response}));
        apiCall('/surveys/user/', { method: 'GET'})
            .then(response => this.setState({surveyHistory: response}));
    }  
    
    render() {
        let { profile, classes } = this.props;
        let { labValueHistory, surveyHistory} = this.state;
        profile = profile.payload ? profile.payload : {}
        if(!labValueHistory || !surveyHistory) {
            return <div className="progress-spinner-container"><CircularProgress size={100} /></div>
        }
        return (
            <React.Fragment>
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
                <LabValueHistoryPreview 
                    labValueHistory={labValueHistory} 
                    height={profile.height}
                    weight={profile.weight} />
                <SurveyHistoryPreview surveyHistory={surveyHistory} />
            </React.Fragment>
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
