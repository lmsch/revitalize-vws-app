/* REACT IMPORTS */
import React from 'react';
/* THIRD PARTY IMPORTS */
import useMediaQuery from '@material-ui/core/useMediaQuery';

export const withMediaQuery = (...args) => Component => props => {
  const mediaQuery = useMediaQuery(...args);
  return <Component mediaQuery={mediaQuery} {...props} />;
};
