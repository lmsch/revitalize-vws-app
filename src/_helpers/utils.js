/* REACT IMPORTS */
import React from 'react';
/* THIRD PARTY IMPORTS */
import { useMediaQuery } from '@material-ui/core';
import * as moment from 'moment';

// In order to use useMediaQuery in a class component.
export const withMediaQuery = (...args) => Component => props => {
  const mediaQuery = useMediaQuery(...args);
  return <Component mediaQuery={mediaQuery} {...props} />;
};

/**
 * Sorts an array of data by date in either ascending or descending order.
 * @param {*} history - Data to sort. {time: string}[]
 * @param {*} dateOrder - 'asc' or 'desc'.
 */
export function handleDateSort(history, dateOrder) {
  if(history) {   
      history = history.slice().sort((h1, h2) => {
          return moment.utc(h1.time).diff(moment.utc(h2.time));
      });
      if(dateOrder === 'desc') {
          history.reverse();
      }
      return history;
  } else {
      return [];
  }
}


