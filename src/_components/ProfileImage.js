import React from 'react';
import { makeStyles , Avatar } from '@material-ui/core';
import { userActions } from '../_actions';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
}));

export default function ImageAvatars() {
  const classes = useStyles();

  return (
         <div className={classes.root}>
             <Avatar alt="Revi Talize" src="/imgLocation" />
          </div>
  );
}
