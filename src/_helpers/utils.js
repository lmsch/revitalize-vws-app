// ---utils.js
// organizes the history by date using moment.

/* REACT IMPORTS */
import React from 'react';
/* THIRD PARTY IMPORTS */
import { useMediaQuery } from '@material-ui/core';
import * as moment from 'moment';

export const withMediaQuery = (...args) => Component => props => {
  const mediaQuery = useMediaQuery(...args);
  return <Component mediaQuery={mediaQuery} {...props} />;
};

export function handleDateSort(history, dateOrder) {
  if(history) {   
      history = history.slice().sort((h1, h2) => {
          return moment.utc(h1.time).diff(moment.utc(h2.time), 'minutes');
      });
      if(dateOrder === 'desc') {
          history.reverse();
      }
      return history;
  } else {
      return [];
  }
}


