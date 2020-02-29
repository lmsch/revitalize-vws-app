import React from 'react';
import { makeStyles, Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import {Header} from '../_components/layout/Header';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
}));



// export default function ImageAvatars() {
//   const classes = useStyles();
//   if (Header.props.loggedIn) {
//     return (
//       <div className={classes.root}>
//         <Avatar alt="Revi Talize" src="/imgLocation" />
//       </div>
//     );
//   }
//   else {
//     return (
//       <div>
//         <Link to="/login">Login</Link>
//       </div>
//     );
//   }
// }
